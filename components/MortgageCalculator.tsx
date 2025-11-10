"use client";

import { useMemo, useState } from "react";

export default function MortgageCalculator({ priceUGX }: { priceUGX: number }) {
  const [downPct, setDownPct] = useState(20);
  const [ratePct, setRatePct] = useState(12);
  const [years, setYears] = useState(15);

  const result = useMemo(() => {
    const principal = priceUGX * (1 - downPct / 100);
    const monthlyRate = ratePct / 100 / 12;
    const n = years * 12;
    const payment = monthlyRate === 0 ? principal / n : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    return { principal, payment };
  }, [priceUGX, downPct, ratePct, years]);

  const ugxFmt = new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", maximumFractionDigits: 0 });
  const usdFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const usdRate = Number(process.env.NEXT_PUBLIC_UGX_PER_USD || 3700) || 3700;

  return (
    <div className="card p-4 space-y-3">
      <div className="text-base font-semibold">Mortgage estimator</div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <label className="space-y-1">
          <span className="block text-slate-600">Down payment %</span>
          <input type="number" value={downPct} min={0} max={90} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-2 py-1" />
        </label>
        <label className="space-y-1">
          <span className="block text-slate-600">Rate %</span>
          <input type="number" value={ratePct} min={0} max={40} onChange={(e) => setRatePct(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-2 py-1" />
        </label>
        <label className="space-y-1">
          <span className="block text-slate-600">Years</span>
          <input type="number" value={years} min={1} max={30} onChange={(e) => setYears(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-2 py-1" />
        </label>
      </div>
      <div className="text-sm text-slate-700">
        Monthly: <b>{ugxFmt.format(result.payment)}</b>
        <span className="ml-2 text-slate-500">(≈ {usdFmt.format(result.payment / usdRate)} USD)</span>
      </div>
    </div>
  );
}

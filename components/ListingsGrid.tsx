"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Plane, DollarSign, CreditCard, Wallet } from "lucide-react";
import type { Listing } from "../data/listings";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ListingsGrid({ listings }: { listings: Listing[] }) {
  function CardImage({ src, alt, booked }: { src: string; alt: string; booked?: boolean }) {
    const [loaded, setLoaded] = useState(false);
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl group-hover:ring-2 group-hover:ring-brand-500">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}
        <Image src={src} alt={alt} fill className="object-cover" onLoad={() => setLoaded(true)} />
        {booked && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">Booked</span>
        )}
      </div>
    );
  }
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [locationQuery, setLocationQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [payment, setPayment] = useState<"" | Listing["payment"][number]>("");
  const [includeBooked, setIncludeBooked] = useState(false);
  const [lakesideOnly, setLakesideOnly] = useState(false);
  const [nearAirportOnly, setNearAirportOnly] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [maxDistance, setMaxDistance] = useState<number | "">("");

  const [currency, setCurrency] = useState<"UGX"|"USD">((typeof window !== 'undefined' && (new URLSearchParams(window.location.search).get('cur') as any)) || "UGX");
  const rate = Number(process.env.NEXT_PUBLIC_UGX_PER_USD || 3700);

  const formatPrice = (ugx: number) => {
    if (currency === "USD") {
      const usd = ugx / (rate || 3700);
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);
    }
    return new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", maximumFractionDigits: 0 }).format(ugx);
  };

  const [reserveIdx, setReserveIdx] = useState<number | null>(null);

  // Initialize state from URL on first load
  useEffect(() => {
    const spMin = searchParams.get("min");
    const spMax = searchParams.get("max");
    const spPay = searchParams.get("pay");
    const spBooked = searchParams.get("booked");
    const spDist = searchParams.get("dist");
    const spLoc = searchParams.get("loc");
    const spCur = searchParams.get("cur");
    const spLake = searchParams.get("lake");
    const spNear = searchParams.get("near");
    const spRegion = searchParams.get("region");
    if (spMin) setMinPrice(Number(spMin));
    if (spMax) setMaxPrice(Number(spMax));
    if (spPay === "Cash" || spPay === "Mortgage" || spPay === "Installments") setPayment(spPay as any);
    if (spBooked === "1") setIncludeBooked(true);
    if (spDist) setMaxDistance(Number(spDist));
    if (spLoc) setLocationQuery(spLoc);
    if (spCur === "USD" || spCur === "UGX") setCurrency(spCur);
    if (spLake === "1") setLakesideOnly(true);
    if (spNear === "1") setNearAirportOnly(true);
    if (spRegion) setRegion(spRegion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist filters to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    function setOrDel(key: string, val: string | null) {
      if (val && val !== "") params.set(key, val);
      else params.delete(key);
    }
    setOrDel("min", typeof minPrice === "number" ? String(minPrice) : null);
    setOrDel("max", typeof maxPrice === "number" ? String(maxPrice) : null);
    setOrDel("pay", payment || null);
    setOrDel("booked", includeBooked ? "1" : null);
    setOrDel("dist", typeof maxDistance === "number" ? String(maxDistance) : null);
    setOrDel("loc", locationQuery || null);
    setOrDel("cur", currency);
    setOrDel("lake", lakesideOnly ? "1" : null);
    setOrDel("near", nearAirportOnly ? "1" : null);
    setOrDel("region", region || null);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [minPrice, maxPrice, payment, includeBooked, maxDistance, locationQuery, currency, lakesideOnly, router, pathname, searchParams]);

  const [region, setRegion] = useState<string>("");

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (!includeBooked && l.booked) return false;
      if (typeof minPrice === "number" && l.price < minPrice) return false;
      if (typeof maxPrice === "number" && l.price > maxPrice) return false;
      if (typeof maxDistance === "number" && l.distanceKm > maxDistance) return false;
      if (payment && !l.payment.includes(payment)) return false;
      if (locationQuery && !l.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
      if (lakesideOnly && !/lake/i.test(l.location)) return false;
      if (nearAirportOnly && l.distanceKm > 10) return false;
      if (region && (l as any).region && (l as any).region !== region) return false;
      return true;
    });
  }, [listings, minPrice, maxPrice, payment, includeBooked, maxDistance]);

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <label className="text-xs text-slate-600">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value as any)} className="rounded-lg border border-slate-300 px-2 py-1 text-sm">
            <option value="UGX">UGX (USh)</option>
            <option value="USD">USD ($)</option>
          </select>
          <div className="ml-auto flex flex-wrap gap-2 text-xs">
            <button type="button" onClick={() => { setRegion("Entebbe"); setNearAirportOnly(false); }} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-50">Entebbe</button>
            <button type="button" onClick={() => { setRegion("Arua"); setNearAirportOnly(false); }} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-50">Arua</button>
            <button type="button" onClick={() => { setRegion("Central"); setNearAirportOnly(false); }} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-50">Central Uganda</button>
            <button type="button" onClick={() => { setRegion(""); setNearAirportOnly(true); }} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-50">Near Airport</button>
            <button type="button" onClick={() => {
              setMinPrice(""); setMaxPrice(""); setPayment(""); setIncludeBooked(false); setMaxDistance(""); setLocationQuery(""); setCurrency("UGX"); setLakesideOnly(false); setNearAirportOnly(false); setRegion("");
              router.replace(pathname, { scroll: false });
            }} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-50">Reset</button>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-7">
          <div>
            <label className="block text-xs text-slate-600">Min Price (IDR)</label>
            <input type="number" inputMode="numeric" value={minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"/>
          </div>
          <div>
            <label className="block text-xs text-slate-600">Max Price (IDR)</label>
            <input type="number" inputMode="numeric" value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"/>
          </div>
          <div>
            <label className="block text-xs text-slate-600">Payment</label>
            <select value={payment} onChange={(e) => setPayment(e.target.value as any)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Any</option>
              <option value="Cash">Cash</option>
              <option value="Mortgage">Mortgage</option>
              <option value="Installments">Installments</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-600">Max Distance (km)</label>
            <input type="number" inputMode="numeric" value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"/>
          </div>
          <div>
            <label className="block text-xs text-slate-600">Location</label>
            <input placeholder="e.g., Entebbe" value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"/>
          </div>
          <label className="mt-6 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includeBooked} onChange={(e) => setIncludeBooked(e.target.checked)} />
            Include booked
          </label>
          <div>
            <label className="block text-xs text-slate-600">Region</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">All</option>
              <option value="Entebbe">Entebbe</option>
              <option value="Arua">Arua (West Nile)</option>
              <option value="Central">Central Uganda</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <label className="mt-6 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={lakesideOnly} onChange={(e) => setLakesideOnly(e.target.checked)} />
            Lakeside only
          </label>
          <label className="mt-6 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={nearAirportOnly} onChange={(e) => setNearAirportOnly(e.target.checked)} />
            Near airport (≤ 10 km)
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {filtered.map((item, i) => (
          <div key={`${item.src}-${i}`} className={`reveal reveal-${(i%4)+1}`}>
            <Link href={`/listings/${(item as any).id || i}`} className="group block">
            <CardImage src={item.src} alt={`Unit ${i+1}`} booked={item.booked} />
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">{formatPrice(item.price)}</div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin size={14} /> {item.location}
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
              <Plane size={14} /> {item.distanceKm} km from airport
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              {item.payment.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-slate-700">
                  {p === "Cash" ? <DollarSign size={14} /> : p === "Mortgage" ? <CreditCard size={14} /> : <Wallet size={14} />}
                  {p}
                </span>
              ))}
            </div>
            <button onClick={() => setReserveIdx(i)} className="btn btn-primary mt-3 w-full text-center">Reserve</button>
            </Link>
          </div>
        ))}
      </div>
      {reserveIdx !== null && (
        <ReserveModal listing={filtered[reserveIdx]} onClose={() => setReserveIdx(null)} />
      )}
    </div>
  );
}

function ReserveModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function submit(formData: FormData) {
    setSubmitting(true);
    setOk(null);
    try {
      const name = String(formData.get("name") || "");
      const email = String(formData.get("email") || "");
      const phone = String(formData.get("phone") || "");
      const message = `Reservation request for unit at ${listing.location}, ${listing.distanceKm}km from airport, price: ${listing.price}`;
      const res = await fetch(`/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, message }) });
      setOk(res.ok);
    } catch {
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold">Reserve Unit</h3>
        <p className="mt-1 text-sm text-slate-600">We’ll contact you to confirm availability and next steps.</p>
        <form action={submit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div className="flex gap-2 pt-2">
            <button disabled={submitting} className="btn btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
          </div>
          {ok === true && <div className="text-sm text-green-700">Submitted! We’ll be in touch shortly.</div>}
          {ok === false && <div className="text-sm text-red-700">Something went wrong. Please try again.</div>}
        </form>
      </div>
    </div>
  );
}

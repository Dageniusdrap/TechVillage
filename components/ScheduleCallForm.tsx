"use client";

import { useState } from "react";

export default function ScheduleCallForm({ listingId }: { listingId?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [status, setStatus] = useState<null | "ok" | "err" | "loading" >(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, preferredTime, listingId })
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-3">
      <div className="text-lg font-semibold">Schedule a Call</div>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+2567xxxxxxx" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <div>
        <label className="block text-sm font-medium">Preferred time</label>
        <input value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} placeholder="e.g., Tomorrow 10am" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <button disabled={status === "loading"} className="btn btn-primary w-full">{status === "loading" ? "Submitting..." : "Request Call"}</button>
      {status === "ok" && <div className="text-sm text-green-700">Weve received your request. Youll get a call shortly.</div>}
      {status === "err" && <div className="text-sm text-red-700">Something went wrong. Please try again.</div>}
    </form>
  );
}

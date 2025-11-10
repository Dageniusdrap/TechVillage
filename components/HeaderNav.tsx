"use client";

import { useState } from "react";
import Link from "next/link";

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-slate-900" onClick={close}>Home</Link>
      <a href="/#features" className="hover:text-slate-900" onClick={close}>Features</a>
      <a href="/#gallery" className="hover:text-slate-900" onClick={close}>Gallery</a>
      <Link href="/videos" className="hover:text-slate-900" onClick={close}>Videos</Link>
      <a href="/#contact" className="hover:text-slate-900" onClick={close}>Contact</a>
      <a href="/#amenities" className="hover:text-slate-900" onClick={close}>Amenities</a>
      <a href="/#location" className="hover:text-slate-900" onClick={close}>Location</a>
      <a href="/#faq" className="hover:text-slate-900" onClick={close}>FAQ</a>
    </>
  );

  return (
    <div className="flex items-center gap-3">
      <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
        <NavLinks />
      </nav>
      <button aria-label="Menu" className="md:hidden rounded-lg border border-slate-300 px-2 py-1 text-sm" onClick={() => setOpen((v) => !v)}>
        Menu
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white/95 p-4 text-sm shadow-sm backdrop-blur md:hidden">
          <div className="section flex flex-col gap-3">
            <NavLinks />
          </div>
        </div>
      )}
    </div>
  );
}

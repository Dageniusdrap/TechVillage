import { ArrowRight, CheckCircle, Phone, MapPin, Home, Shield, Leaf, CreditCard, Wallet, DollarSign, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ListingsGrid from "@/components/ListingsGrid";
import { LISTINGS } from "@/data/listings";
import ScheduleCallForm from "@/components/ScheduleCallForm";

const FEATURE_LIST = [
  { icon: Home, title: "Smart Home Ready", text: "Pre-wired automation, keyless entry, and energy monitoring." },
  { icon: Shield, title: "24/7 Security", text: "Gated access, CCTV coverage, and on-site security team." },
  { icon: Leaf, title: "Green Spaces", text: "Parks, jogging tracks, and serene community areas." },
];

/* Listings moved to data/listings.ts */

export default function Page() {
  return (
    <main className="">
      {/* Hero */}
      <section className="section section-pt section-pb">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_10%_10%,#e6efff_0%,transparent_40%),radial-gradient(1000px_circle_at_90%_20%,#eef2ff_0%,transparent_35%)]"/>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <MapPin size={14} /> Entebbe, Uganda
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Smart, Comfortable, and Modern Living
            </h1>
            <p className="mt-4 max-w-prose text-slate-600">
              Experience a thoughtfully planned community featuring smart-ready homes, lush landscapes,
              and convenient access to shopping, schools, and lifestyle hubs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#contact" className="btn btn-primary">
                Book a Visit <ArrowRight size={16} />
              </Link>
              <a href="tel:+621234567890" className="btn btn-outline"><Phone size={16}/> Call Sales</a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle className="text-brand-600" size={18}/> Free consultation • Transparent pricing • Flexible payment
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image src={LISTINGS[0].src} alt="Modern home" fill className="object-cover" priority/>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section section-pb">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURE_LIST.map((f, idx) => (
            <div key={f.title} className={`card p-6 reveal reveal-${idx+1}`}>
              <f.icon className="text-brand-600" />
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section section-pb">
        <h2 className="mb-4 text-2xl font-semibold">Available Units</h2>
        <ListingsGrid listings={LISTINGS} />
      </section>

      {/* CTA */}
      <section id="contact" className="section section-pb">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Schedule a Site Visit</h2>
            <p className="mt-2 text-slate-600">Leave your details — our sales team will contact you shortly.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-brand-600" size={18}/> Exclusive preview slots each weekend</li>
              <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-brand-600" size={18}/> Financing options available</li>
              <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-brand-600" size={18}/> Show units ready to view</li>
            </ul>
          </div>
          <div className="space-y-4">
            <ContactForm />
            {/* Optional call scheduling form (Twilio-ready) */}
            {/* @ts-expect-error Server Component importing Client Component via dynamic string is okay when compiled */}
            <ScheduleCallForm listingId={undefined} />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="section section-pb">
        <h2 className="mb-4 text-2xl font-semibold">Amenities</h2>
        <p className="text-slate-600 mb-6">Everything you need for a comfortable and active lifestyle.</p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Clubhouse and community hall",
            "Children’s playgrounds",
            "Jogging and cycling paths",
            "Nearby shopping and dining",
            "Easy access to schools",
            "24/7 gated security",
          ].map((item) => (
            <div key={item} className="card p-4 flex items-start gap-3 reveal reveal-1">
              <CheckCircle className="mt-0.5 text-brand-600" size={18} />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section id="location" className="section section-pb">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Convenient Location</h2>
            <p className="mt-2 text-slate-600">Situated across Uganda with easy access to business hubs, schools, and shopping centers. Many of our properties are near Entebbe International Airport.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-brand-600" size={18}/> 10–15 minutes to shopping & dining</li>
              <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-brand-600" size={18}/> Close to schools and medical facilities</li>
              <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-brand-600" size={18}/> Quick access to main transport routes</li>
            </ul>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="TechVillage Location"
              className="h-[300px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.458565815224!2d32.4453!3d0.0424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbff1b38f7b1%3A0x8b89e2b2d1d0c6f0!2sEntebbe%20International%20Airport!5e0!3m2!1sen!2sug!4v1680000000000"></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section section-pb">
        <h2 className="mb-4 text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "How do I book a viewing?", a: "Use the contact form to leave your details, and our sales team will reach out to schedule a slot." },
            { q: "Do you offer financing options?", a: "Yes, we offer flexible payment plans and can connect you with partner banks." },
            { q: "Are show units available?", a: "Yes, show units are available for tours on weekends and by appointment on weekdays." },
          ].map((item) => (
            <details key={item.q} className="card px-4 py-3">
              <summary className="cursor-pointer select-none py-2 text-sm font-medium text-slate-800">{item.q}</summary>
              <p className="pb-2 text-sm text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="section section-pb">
        <div className="grid gap-6 rounded-2xl border border-slate-200 p-6 text-sm text-slate-700 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold text-slate-900">TechVillage</div>
            <p className="mt-1 text-slate-600">Smart living in Uganda — modern homes, green spaces, and secure community.</p>
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">Contact</div>
            <ul className="mt-1 space-y-1">
              <li>Phone: <a href="tel:+256700000000" className="underline hover:text-slate-900">+256 700 000000</a></li>
              <li>Email: <a href="mailto:sales@techvillage.ug" className="underline hover:text-slate-900">sales@techvillage.ug</a></li>
              <li>Location: Entebbe, Uganda</li>
            </ul>
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">Follow</div>
            <div className="mt-1 flex gap-3">
              <a className="underline hover:text-slate-900" href="#" aria-label="Instagram">Instagram</a>
              <a className="underline hover:text-slate-900" href="#" aria-label="Facebook">Facebook</a>
              <a className="underline hover:text-slate-900" href="#" aria-label="X">X</a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} TechVillage. All rights reserved.</div>
      </footer>
    </main>
  );
}

function ContactForm() {
  async function action(formData: FormData) {
    "use server";

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const message = String(formData.get("message") || "");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message })
      });
      if (!res.ok) throw new Error("Failed to submit");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form action={action} className="card p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input name="phone" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <button className="btn btn-primary w-full">Submit</button>
    </form>
  );
}

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LISTINGS } from "@/data/listings";
import type { Listing } from "@/data/listings";
import ScheduleCallForm from "@/components/ScheduleCallForm";
import { MapPin, Plane, BedDouble, Bath, Ruler } from "lucide-react";
import MortgageCalculator from "@/components/MortgageCalculator";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: l.id }));
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) { 
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) return notFound();

  const images = listing.images && listing.images.length ? listing.images : [listing.src];

  return (
    <main className="section section-pt section-pb">
      <Link href="/#gallery" className="text-sm text-slate-600 hover:underline">← Back to listings</Link>
      <h1 className="mt-2 text-2xl font-semibold">{listing.title}</h1>
      <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1"><MapPin size={16} /> {listing.location}</span>
        <span className="inline-flex items-center gap-1"><Plane size={16} /> {listing.distanceKm} km from airport</span>
        {listing.bedrooms ? <span className="inline-flex items-center gap-1"><BedDouble size={16} /> {listing.bedrooms} BR</span> : null}
        {listing.bathrooms ? <span className="inline-flex items-center gap-1"><Bath size={16} /> {listing.bathrooms} BA</span> : null}
        {listing.areaSqm ? <span className="inline-flex items-center gap-1"><Ruler size={16} /> {listing.areaSqm} m²</span> : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image src={images[0]} alt={listing.title} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={src} alt={`${listing.title} ${i+2}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {listing.videos && listing.videos.length ? (
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold">Video tour</h2>
            <div className="mt-2 grid gap-4 md:grid-cols-2">
              {listing.videos.slice(0, 2).map((url) => (
                <div key={url} className="card overflow-hidden">
                  <div className="aspect-video">
                    <iframe className="h-full w-full" src={url} title={listing.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold">About this home</h2>
          <p className="mt-2 text-slate-700">{listing.description || "Modern home in a great location with access to amenities and green spaces."}</p>
        </div>
        <div className="card p-4">
          {(() => {
            const rate = Number(process.env.NEXT_PUBLIC_UGX_PER_USD || 3700);
            const ugx = new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", maximumFractionDigits: 0 }).format(listing.price);
            const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(listing.price / (rate || 3700));
            return (
              <>
                <div className="text-2xl font-semibold">{ugx}</div>
                <div className="text-sm text-slate-600">≈ {usd}</div>
              </>
            );
          })()}
          <p className="mt-1 text-xs text-slate-600">Prices shown in Ugandan Shillings with approximate USD conversion.</p>
          <a href="#contact" className="btn btn-outline mt-3 w-full text-center">Contact</a>
          <div className="mt-3">
            <ScheduleCallForm listingId={listing.id} />
          </div>
          <div className="mt-3">
            <MortgageCalculator priceUGX={listing.price} />
          </div>
        </div>
      </div>
    </main>
  );
}

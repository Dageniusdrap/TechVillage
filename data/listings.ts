export type Listing = {
  id: string;
  title: string;
  src: string; // primary image
  images?: string[];
  videos?: string[];
  price: number; // in UGX
  booked: boolean;
  location: string;
  distanceKm: number;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  description?: string;
  payment: ("Cash" | "Mortgage" | "Installments")[];
  region?: "Entebbe" | "Arua" | "Central" | "Other";
};

import json from "./listings.json" assert { type: "json" };

export const LISTINGS: Listing[] = json as Listing[];

export interface PropertyListing {
  slug: string;
  name: string;
  address: string;
  region: string;
  price: number;
  beds: number;
  baths: number;
  area: string;
  image: string;
  gallery: string[];
  popular: boolean;
  description: string;
  stats: { label: string; value: string }[];
}

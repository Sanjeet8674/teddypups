export const site = {
  name: "TeddyPups",
  fullName: "TeddyPups U.A.E.",
  tagline: "every puppy is family",
  phone: "+971 54 167 6733",
  phoneTel: "+971541676733",
  email: "teddypupsadmin@gmail.com",
  address: "Downtown Dubai, United Arab Emirates",
  mapsUrl: "https://maps.google.com/?q=Downtown+Dubai",
  whatsapp:
    "https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%27d%20love%20to%20know%20more%20about%20your%20puppies.",
  social: {
    instagram: "https://www.instagram.com/teddypups.worldwide/",
    tiktok: "https://www.tiktok.com/@teddypupsuae",
    facebook: "https://www.facebook.com/profile.php?id=61567496944539",
  },
  logo: "/brand/logo.png",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
] as const;

export const footerExplore = [
  { href: "/puppies", label: "Available puppies" },
  { href: "/gone-home", label: "Gone home" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/how-it-works#delivery", label: "Delivery & collection" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
] as const;

/** Map reference media paths to local /public assets (webp/avif saved as jpg). */
export function media(path: string) {
  let p = path.startsWith("/") ? path : `/${path}`;
  p = p.replace(/\.webp$/i, ".jpg").replace(/\.avif$/i, ".jpg");
  if (!p.startsWith("/media/") && !p.startsWith("/brand/")) {
    p = `/media${p.startsWith("/") ? "" : "/"}${p.replace(/^\/media/, "")}`;
  }
  return p;
}

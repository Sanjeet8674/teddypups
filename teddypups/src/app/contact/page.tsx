import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { showroomImages } from "@/data/families";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit & contact",
};

export default function ContactPage() {
  return (
    <div className="section-pad py-12 md:py-16">
      <div className="prose-max grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border-2 border-cocoa/10 bg-white p-6 shadow-[0_4px_0_rgba(42,23,14,0.06)]">
            <p className="text-xs font-bold uppercase tracking-wide text-cocoa/50">WhatsApp</p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-plush text-2xl font-bold text-whatsapp"
            >
              {site.phone}
            </a>
          </div>
          <div className="rounded-[1.75rem] border-2 border-cocoa/10 bg-white p-6 shadow-[0_4px_0_rgba(42,23,14,0.06)]">
            <p className="text-xs font-bold uppercase tracking-wide text-cocoa/50">call us</p>
            <a href={`tel:${site.phoneTel}`} className="mt-2 block font-plush text-2xl font-bold">
              {site.phone}
            </a>
          </div>
          <div className="rounded-[1.75rem] border-2 border-cocoa/10 bg-white p-6 shadow-[0_4px_0_rgba(42,23,14,0.06)]">
            <p className="text-xs font-bold uppercase tracking-wide text-cocoa/50">email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block break-all font-plush text-xl font-bold"
            >
              {site.email}
            </a>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border-2 border-cocoa/10 bg-white shadow-[0_4px_0_rgba(42,23,14,0.06)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={showroomImages[3] ?? showroomImages[0]}
                alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            <div className="p-6">
              <h2 className="font-plush text-2xl font-extrabold">Visit us in Downtown Dubai</h2>
              <p className="mt-3 text-[15px] text-cocoa/75">
                Step into our Downtown Dubai showroom and experience the joy of choosing your puppy
                face-to-face.
              </p>
              <p className="mt-4 font-semibold">{site.address}</p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-5 h-11 px-5 text-sm"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
};

const localSteps = [
  {
    t: "Explore our puppies",
    b: "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.",
  },
  {
    t: "Choose your puppy",
    b: "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.",
  },
  {
    t: "Meet before you choose",
    b: "Spend time bonding before making your decision.",
  },
  {
    t: "Pick-up or delivery",
    b: "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.",
  },
];

const importSteps = [
  {
    t: "Reserve your puppy",
    b: "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.",
  },
  {
    t: "Personalized consultation",
    b: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey.",
  },
  {
    t: "Import and arrival",
    b: "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.",
  },
  {
    t: "Welcome home",
    b: "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.",
  },
];

const delivery = [
  {
    t: "Take your puppy home the same day",
    b: "Local puppies are available immediately — visit, fall in love, and go home together.",
  },
  {
    t: "Delivery within Dubai",
    b: "Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.",
  },
  {
    t: "Safe international cargo",
    b: "We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.",
  },
  {
    t: "Worldwide delivery",
    b: "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="section-pad py-12 md:py-16">
      <div className="prose-max">
        <h1 className="font-plush max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
          How it works
        </h1>
        <p className="mt-4 max-w-2xl text-cocoa/75">
          Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups
          is here to make the experience unforgettable.
        </p>

        <h2 className="font-plush mt-14 text-3xl font-extrabold">Two ways home</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border-2 border-cocoa/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold text-caramel">Downtown Dubai</p>
            <h3 className="font-plush mt-2 text-2xl font-extrabold">Meet your puppy in person</h3>
            <p className="mt-3 text-[15px] text-cocoa/75">
              Step into our Downtown Dubai showroom and experience the joy of choosing your puppy
              face-to-face. We source healthy, well-socialized puppies from trusted local breeders,
              ensuring they&apos;re raised with care, proper nutrition, and veterinary checks.
            </p>
            <ol className="mt-6 space-y-4">
              {localSteps.map((step, i) => (
                <li key={step.t} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cocoa text-sm font-bold text-cream">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold">{step.t}</h4>
                    <p className="text-sm text-cocoa/70">{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-[2rem] border-2 border-cocoa bg-cocoa p-6 text-cream md:p-8">
            <p className="text-sm font-semibold text-sand">Europe · Korea → Dubai</p>
            <h3 className="font-plush mt-2 text-2xl font-extrabold">Order upon request</h3>
            <p className="mt-3 text-[15px] text-cream/75">
              Looking for a truly exceptional companion? Our Order Upon Request service gives you
              access to some of the world&apos;s most sought-after teacup breeds — ethically sourced
              from the most reputable, certified breeders across Europe, Korea, and beyond.
            </p>
            <ol className="mt-6 space-y-4">
              {importSteps.map((step, i) => (
                <li key={step.t} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-sm font-bold text-cocoa">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold">{step.t}</h4>
                    <p className="text-sm text-cream/70">{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <section className="mt-16">
          <h2 className="font-plush text-3xl font-extrabold">Our premium puppy promise</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Hand-selected breeders",
                b: "We work only with breeders who uphold the highest ethical and health standards.",
              },
              {
                t: "Full transparency",
                b: "Photos, videos, and health certificates are shared before your puppy travels.",
              },
              {
                t: "Safe, stress-free delivery",
                b: "We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.",
              },
            ].map((item) => (
              <li key={item.t} className="rounded-[1.5rem] border border-cocoa/10 bg-white p-5">
                <h3 className="font-plush text-lg font-bold">{item.t}</h3>
                <p className="mt-2 text-sm text-cocoa/70">{item.b}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="delivery" className="mt-16 scroll-mt-24">
          <h2 className="font-plush text-3xl font-extrabold">Delivery & collection</h2>
          <p className="mt-3 max-w-2xl text-cocoa/75">
            From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels
            comfortably and arrives safely.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {delivery.map((item) => (
              <li key={item.t} className="rounded-[1.5rem] border border-cocoa/10 bg-blush/50 p-5">
                <h3 className="font-plush text-lg font-bold">{item.t}</h3>
                <p className="mt-2 text-sm text-cocoa/70">{item.b}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-[2rem] bg-cocoa px-6 py-10 text-cream md:px-10">
          <h2 className="font-plush text-3xl font-extrabold">Why choose us</h2>
          <p className="mt-4 max-w-2xl text-cream/75">
            We&apos;re here to help you find a new family member. From the moment you visit our site
            to the joyful day your puppy arrives at your door, we&apos;re with you every step of the
            way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/puppies" className="btn h-11 bg-cream px-5 text-sm font-semibold text-cocoa">
              Browse puppies
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp h-11 px-5 text-sm"
            >
              WhatsApp us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

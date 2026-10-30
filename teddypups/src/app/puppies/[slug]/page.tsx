import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getPuppy, puppies } from "@/data/puppies";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const puppy = getPuppy(slug);
  if (!puppy) return { title: "Puppy" };
  return {
    title: puppy.name === puppy.breed ? `${puppy.breed} puppy (${puppy.sex.toLowerCase()})` : `${puppy.name}, ${puppy.breed} puppy`,
  };
}

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const puppy = getPuppy(slug);
  if (!puppy) notFound();

  const gone = puppy.status === "gone";

  return (
    <div className="section-pad py-10 md:py-16">
      <div className="prose-max">
        <p className="font-scrawl text-caramel">1 hello, it&apos;s me</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-cocoa/10 bg-white shadow-[0_6px_0_rgba(42,23,14,0.06)]">
            <Image
              src={puppy.image}
              alt={`${puppy.name}, ${puppy.breed} puppy`}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
            {puppy.hasVideo && !gone && (
              <span className="absolute bottom-4 left-4 rounded-full bg-cocoa/85 px-3 py-1.5 text-sm font-bold text-cream">
                ▶ video available on WhatsApp
              </span>
            )}
          </div>

          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                gone ? "bg-caramel text-cream" : "bg-cream-deep text-cocoa"
              }`}
            >
              {gone ? "gone home ♥" : "Available"}
            </span>
            <h1 className="font-plush mt-4 text-4xl font-extrabold md:text-5xl">{puppy.name}</h1>
            <p className="mt-2 text-lg text-cocoa/70">{puppy.breed}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[1.5rem] border border-cocoa/10 bg-white p-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-cocoa/50">Breed</dt>
                <dd className="mt-1 font-semibold">{puppy.breed}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-cocoa/50">
                  Boy or girl
                </dt>
                <dd className="mt-1 font-semibold">{puppy.sex}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-cocoa/50">Age</dt>
                <dd className="mt-1 font-semibold">{puppy.age}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-cocoa/50">Where</dt>
                <dd className="mt-1 font-semibold">{puppy.where}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <h2 className="font-plush text-2xl font-bold">Every Teddy Pup comes</h2>
              <ul className="mt-4 space-y-2 text-[15px] text-cocoa/80">
                {[
                  "Vaccinated",
                  "Dewormed",
                  "Verified health certificate from licensed vets",
                  "Thoroughly checked before joining your family",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-whatsapp">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {!gone && (
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-8 h-12 px-6"
              >
                Ask about {puppy.name} on WhatsApp
              </a>
            )}
            {gone && (
              <Link href="/puppies" className="btn btn-primary mt-8 h-12 px-6">
                Browse available puppies
              </Link>
            )}
          </div>
        </div>

        {!gone && (
          <section className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-scrawl text-caramel">Coming home from abroad</p>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    t: "Reserve your puppy",
                    b: "Tell us which puppy has captured your heart.",
                  },
                  {
                    t: "Personalized consultation",
                    b: "We finalize details with you and share updates on your puppy's journey.",
                  },
                  {
                    t: "Import and arrival",
                    b: "We manage health checks, travel arrangements, and documentation.",
                  },
                  {
                    t: "Welcome home",
                    b: "We help your new puppy settle in and ensure a smooth transition into your home.",
                  },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cocoa font-plush font-bold text-cream">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-plush text-lg font-bold">{step.t}</h3>
                      <p className="text-sm text-cocoa/70">{step.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-scrawl mb-4 text-caramel">4 dear TeddyPups…</p>
              <ContactForm
                defaultPuppy={puppy.slug}
                title={`Ask about ${puppy.name}`}
                intro="Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply."
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

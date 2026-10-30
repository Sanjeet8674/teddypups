import Link from "next/link";
import { HappyFamilies } from "@/components/HappyFamilies";
import { HeroStage } from "@/components/HeroStage";
import { HomeCta } from "@/components/HomeCta";
import { MeetPups } from "@/components/MeetPups";
import { PuppyJourney } from "@/components/PuppyJourney";
import { QuestionsNight } from "@/components/QuestionsNight";
import { TrustPassport } from "@/components/TrustPassport";
import { TwoWays } from "@/components/TwoWays";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section
        data-pup-scene="true"
        className="tp-scene tp-hero tp-hero--home"
        aria-labelledby="hero-title"
      >
        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg
              viewBox="0 0 220 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
              aria-hidden
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          <h1 id="hero-title" className="tp-hero__title font-plush">
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>
          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from
            trusted breeders worldwide.
          </p>
          <div className="tp-hero__actions">
            <Link href="/puppies" className="btn btn-primary">
              View available puppies
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <HeroStage />
      </section>

      <MeetPups />

      <TwoWays />

      <PuppyJourney />

      <TrustPassport />

      <HappyFamilies />

      <QuestionsNight />

      <HomeCta />
    </>
  );
}

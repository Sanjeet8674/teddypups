import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { TeddyPeek } from "@/components/TeddyPeek";

export type LineupPup = {
  slug: string;
  name: string;
  breed: string;
  image: string;
  alt: string;
  x: string;
  w: string;
  peek: string;
  tilt: string;
  objectPosition?: string;
};

const DEFAULT_LINEUP: LineupPup[] = [
  {
    slug: "korean-teacup-pomeranian-male",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    image: "/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg",
    alt: "Male Korean Teacup Pomeranian puppy",
    x: "9%",
    w: "8.6rem",
    peek: "0.62",
    tilt: "-5deg",
    objectPosition: "48.9% 44.1%",
  },
  {
    slug: "maltipoo-female",
    name: "Maltipoo",
    breed: "Maltipoo",
    image: "/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg",
    alt: "Female Maltipoo puppy",
    x: "22.5%",
    w: "10.4rem",
    peek: "0.8",
    tilt: "3deg",
    objectPosition: "56.9% 49.2%",
  },
  {
    slug: "copper-male",
    name: "Copper",
    breed: "Cavapoo",
    image: "/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg",
    alt: "Copper, male Cavapoo puppy",
    x: "35%",
    w: "9.2rem",
    peek: "0.7",
    tilt: "-2deg",
    objectPosition: "43% 50.5%",
  },
  {
    slug: "toy-poodle-male-female",
    name: "Toy Poodle",
    breed: "Toy Poodle",
    image: "/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    alt: "Toy Poodle puppy",
    x: "65%",
    w: "9.4rem",
    peek: "0.74",
    tilt: "3deg",
    objectPosition: "65.4% 44.7%",
  },
  {
    slug: "shitzu-female",
    name: "Shih Tzu",
    breed: "Shih Tzu",
    image: "/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
    alt: "Female Shih Tzu puppy",
    x: "77.5%",
    w: "10.6rem",
    peek: "0.82",
    tilt: "-3deg",
    objectPosition: "44.8% 42.5%",
  },
  {
    slug: "korean-teacup-pomeranian-1",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    image: "/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg",
    alt: "Female Korean Teacup Pomeranian puppy",
    x: "91%",
    w: "8.4rem",
    peek: "0.6",
    tilt: "4deg",
    objectPosition: "49.9% 51.3%",
  },
];

export function HeroStage({ pups = DEFAULT_LINEUP }: { pups?: LineupPup[] }) {
  return (
    <div className="tp-hero__stage">
      <div className="tp-hero__sun" aria-hidden />

      <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
        {pups.map((pup, i) => (
          <li
            key={pup.slug}
            className="tp-lineup__seat"
            style={
              {
                "--x": pup.x,
                "--w": pup.w,
                "--peek": pup.peek,
                "--tilt": pup.tilt,
                "--i": String(i),
              } as CSSProperties
            }
          >
            <Link
              href={`/puppies/${pup.slug}`}
              className="tp-lineup__pup"
              aria-label={`Meet ${pup.name}, ${pup.breed}`}
            >
              <span className="tp-lineup__photo">
                <Image
                  src={pup.image}
                  alt={pup.alt}
                  fill
                  sizes="11rem"
                  priority={i < 2}
                  className="object-cover"
                  style={{ objectPosition: pup.objectPosition ?? "50% 50%" }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ul aria-hidden className="tp-lineup tp-lineup--tags">
        {pups.map((pup, i) => (
          <li
            key={`tag-${pup.slug}`}
            className="tp-lineup__seat"
            style={
              {
                "--x": pup.x,
                "--w": pup.w,
                "--peek": pup.peek,
                "--tilt": pup.tilt,
                "--i": String(i),
              } as CSSProperties
            }
          >
            <span className="tp-lineup__ghost" data-tag={i === 2 ? "show" : undefined}>
              <span className="tp-lineup__name font-scrawl">{pup.name}</span>
            </span>
          </li>
        ))}
      </ul>

      <span aria-hidden className="tp-lineup__wings">
        <Image
          src="/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg"
          alt=""
          fill
          sizes="11rem"
          className="object-cover"
          style={{ objectPosition: "47.5% 50.5%" }}
        />
      </span>

      <div
        data-pup-stop="true"
        data-pose="peek"
        data-facing="right"
        data-act="peekaboo"
        data-lane="true"
        className="pup-stop tp-hero__teddy"
      >
        <TeddyPeek />
      </div>

      <div aria-hidden className="tp-quilt">
        <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
              <path
                d="M0 27A38 25 0 0 1 76 27"
                fill="none"
                stroke="#2a170e"
                strokeWidth="3"
              />
              <path
                d="M11 33A27 19 0 0 1 65 33"
                fill="none"
                stroke="#2a170e"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity="0.42"
              />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-scallop)" />
        </svg>
        <div className="tp-quilt__fill" />
      </div>
    </div>
  );
}

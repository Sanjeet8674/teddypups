"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SketchPuppy } from "@/components/SketchPuppy";
import { TeddySit } from "@/components/TeddySit";
import {
  availablePuppies,
  goneHomePuppies,
  type Puppy,
} from "@/data/puppies";

const WHERE = ["Everywhere", "Imported", "Korean Teacup"] as const;
const BREEDS = ["Maltipoo", "Pomeranian", "Poodle", "Cavapoo", "Shih Tzu"] as const;
const SEXES = ["Boys", "Girls"] as const;

function breedFromParam(raw: string | null): (typeof BREEDS)[number] | null {
  if (!raw) return null;
  const n = raw.replace(/-/g, " ").toLowerCase();
  return BREEDS.find((b) => b.toLowerCase() === n) ?? null;
}

function whereFromParam(raw: string | null): (typeof WHERE)[number] {
  if (raw === "imported") return "Imported";
  if (raw === "korean" || raw === "korean-teacup") return "Korean Teacup";
  return "Everywhere";
}

const FOCUS: Record<string, string> = {
  "maltipoo-max-male": "53.8% 44.3%",
  "korean-teacup-maltipoo-female": "52.5% 42.6%",
  "korean-teacup-poodle-female": "54.5% 45.7%",
  "maltipoo-cavapoo-male": "44.7% 29.5%",
  "toy-poodle-male-female": "65.4% 44.7%",
  "maltipoo-female-2": "64.6% 42.3%",
  "pomeranian-female": "40.3% 44.3%",
  "copper-male": "43% 50.5%",
  "shitzu-female": "44.8% 42.5%",
  "shitzu-male": "40.3% 43.6%",
  "maltipoo-female-1": "47.5% 50.5%",
  "maltipoo-female": "56.9% 49.2%",
  "korean-teacup-pomeranian-1": "49.9% 51.3%",
  "korean-teacup-pomeranian": "49.9% 48.6%",
  "korean-teacup-pomeranian-male": "48.9% 44.1%",
};

function matchesWhere(puppy: Puppy, where: (typeof WHERE)[number] | null) {
  if (!where || where === "Everywhere") return true;
  if (where === "Korean Teacup") {
    return /korean\s*teacup/i.test(puppy.breed) || /korean\s*teacup/i.test(puppy.name);
  }
  return puppy.where === "Imported for you";
}

function matchesBreed(puppy: Puppy, breed: (typeof BREEDS)[number] | null) {
  if (!breed) return true;
  return puppy.breed.toLowerCase().includes(breed.toLowerCase());
}

function matchesSex(puppy: Puppy, sex: (typeof SEXES)[number] | null) {
  if (!sex) return true;
  const s = puppy.sex.toLowerCase();
  if (sex === "Boys") return s.includes("boy");
  return s.includes("girl");
}

function Chip({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className="tp-sticker-chip"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function PuppiesSketchbook() {
  const params = useSearchParams();
  const [where, setWhere] = useState<(typeof WHERE)[number]>(() =>
    whereFromParam(params.get("origin") ?? params.get("where")),
  );
  const [breed, setBreed] = useState<(typeof BREEDS)[number] | null>(() =>
    breedFromParam(params.get("breed")),
  );
  const [sex, setSex] = useState<(typeof SEXES)[number] | null>(null);

  const filtered = useMemo(
    () =>
      availablePuppies.filter(
        (p) => matchesWhere(p, where) && matchesBreed(p, breed) && matchesSex(p, sex),
      ),
    [where, breed, sex],
  );

  const countLabel =
    filtered.length === 1
      ? "1 puppy looking for a home"
      : `${filtered.length} puppies looking for a home`;

  return (
    <div className="tp-sketchbook">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        <div className="tp-sketchbook__head">
          <div className="tp-sketchbook__words">
            <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true" data-revealed="true">
              from Teddy&apos;s sketchbook
            </p>
            <h1 id="pups-title" className="font-plush text-giant tp-sketchbook__title">
              Available puppies
              <svg
                aria-hidden
                viewBox="0 0 400 24"
                preserveAspectRatio="none"
                className="tp-sketchbook__underline"
              >
                <path
                  d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1"
                  pathLength={1}
                />
              </svg>
            </h1>
            <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft">
              Every listing shows real photos of the actual puppy. Open a profile to see them all,
              then ask us about them on WhatsApp.
            </p>
          </div>
          <div className="tp-sketchbook__self">
            <TeddySit />
            <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
          </div>
        </div>

        <div className="mt-12">
          <div
            role="group"
            aria-label="Filter puppies"
            className="tp-sketchpad flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                where
              </span>
              {WHERE.map((w) => (
                <Chip
                  key={w}
                  label={w}
                  pressed={where === w}
                  onClick={() => setWhere(w)}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                breed
              </span>
              {BREEDS.map((b) => (
                <Chip
                  key={b}
                  label={b}
                  pressed={breed === b}
                  onClick={() => setBreed((cur) => (cur === b ? null : b))}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                boy or girl
              </span>
              {SEXES.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  pressed={sex === s}
                  onClick={() => setSex((cur) => (cur === s ? null : s))}
                />
              ))}
            </div>
          </div>

          <p className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]" aria-live="polite">
            {countLabel}
          </p>

          <ul className="tp-sketches mt-8">
            {filtered.map((puppy, i) => (
              <li key={puppy.slug}>
                <SketchPuppy
                  puppy={puppy}
                  index={i}
                  focus={FOCUS[puppy.slug]}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section
        id="gone-home"
        className="tp-gone-strip scroll-mt-24"
        aria-labelledby="gone-title"
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="gone-title" className="font-plush text-big">
                Already gone home
              </h2>
              <p className="mt-3 max-w-[40ch] text-cocoa-soft">
                These puppies have found their families.
              </p>
            </div>
            <a
              href="/gone-home"
              className="font-scrawl text-lg text-toffee-ink underline decoration-2 underline-offset-4"
            >
              See the puppies who&apos;ve gone home
            </a>
          </div>
          <ul className="tp-gone-strip__row mt-10">
            {goneHomePuppies.map((puppy, i) => (
              <li key={puppy.slug}>
                <SketchPuppy puppy={puppy} index={i} small />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";
import { TeddySit } from "@/components/TeddySit";
import { familyMoments, testimonial } from "@/data/families";

const TILTS = [-2.2, 1.6, -0.9, 2.4, -1.5, 0.8, -2.6, 1.2];
const TAPES = ["#f6d79a", "#f9cdbf", "#cfe5f6", "#f6d79a", "#e9dcc4", "#f6d79a", "#f9cdbf", "#cfe5f6"];
const DELAYS = [330, 0, 550, 110, 660, 220, 770, 440];
const TAPE_LAYOUTS: Array<"center" | "left" | "right" | "corners"> = [
  "center",
  "left",
  "right",
  "corners",
  "center",
  "right",
  "left",
  "center",
];

function Tape({ layout }: { layout: (typeof TAPE_LAYOUTS)[number] }) {
  if (layout === "corners") {
    return (
      <>
        <span aria-hidden className="tp-tape tp-tape--tl" />
        <span aria-hidden className="tp-tape tp-tape--tr" />
      </>
    );
  }
  return <span aria-hidden className={`tp-tape tp-tape--${layout}`} />;
}

export function HappyFamilies() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLLIElement>("li[data-reveal]")];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const li = entry.target as HTMLLIElement;
          li.setAttribute("data-armed", "true");
          requestAnimationFrame(() => li.setAttribute("data-revealed", "true"));
          io.unobserve(li);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  const prints = familyMoments.slice(0, 8);

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-dusk"
      aria-labelledby="dusk-title"
      style={
        {
          ["--sky-top"]: "#a65a30",
          ["--sky-bottom"]: "#4d2b19",
        } as CSSProperties
      }
    >
      <div className="tp-dusk__sky gutter">
        <div className="tp-dusk__head">
          <h2 id="dusk-title" className="font-plush text-huge">
            Happy families & puppies
          </h2>
          <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
            We are truly honored to see our puppies become cherished members of loving families. These
            heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into
            their homes and hearts.
          </p>
        </div>

        <figure className="tp-dusk__note">
          <blockquote className="font-plush-text">“{testimonial.quote}”</blockquote>
          <figcaption className="font-scrawl">{testimonial.author}</figcaption>
        </figure>
      </div>

      <div className="tp-photowall">
        <div className="tp-photowall__wall">
          <ul
            ref={listRef}
            className="tp-photowall__prints"
            aria-label="Photos from TeddyPups families"
          >
            {prints.map((moment, i) => (
              <li
                key={moment.caption}
                data-reveal="true"
                style={{ ["--d"]: `${DELAYS[i]}ms` } as CSSProperties}
              >
                <Link
                  href="/happy-families"
                  className="tp-photowall__print"
                  aria-label={`Open photo ${i + 1} of 64: ${moment.caption}`}
                >
                  <span
                    className="tp-polaroid"
                    style={
                      {
                        ["--tilt"]: `${TILTS[i]}deg`,
                        ["--tape"]: TAPES[i],
                        ["--i"]: i,
                      } as CSSProperties
                    }
                  >
                    <Tape layout={TAPE_LAYOUTS[i]!} />
                    <span className="tp-polaroid__photo">
                      <Image
                        src={moment.image}
                        alt="A happy TeddyPups family with their new puppy"
                        width={433}
                        height={433}
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 42vw"
                      />
                    </span>
                    <span className="tp-polaroid__caption font-scrawl">{moment.caption}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="tp-facade__ground">
            <span aria-hidden className="tp-facade__door" />
            <span aria-hidden className="tp-lamp">
              <span className="tp-lamp__light" />
            </span>
            <Link className="btn btn-primary tp-facade__cta" href="/happy-families">
              See every happy family
            </Link>
            <div
              data-pup-stop="true"
              data-pose="sit"
              data-facing="right"
              className="pup-stop tp-dusk__teddy"
            >
              <TeddySit />
            </div>
          </div>
        </div>
        <div aria-hidden className="tp-street__pavement" />
      </div>
    </section>
  );
}

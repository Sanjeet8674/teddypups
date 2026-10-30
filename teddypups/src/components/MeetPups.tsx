"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";
import { TeddyWalk } from "@/components/TeddyWalk";
import { availablePuppies, type Puppy } from "@/data/puppies";

const DOOR_COLORS = ["#a24a1a", "#5a3a28", "#d4893f", "#b8644a", "#7a4a2e"];

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

function metaFor(p: Puppy) {
  const sex = p.sex.toLowerCase();
  const parts: string[] = [];
  if (p.name !== p.breed) parts.push(p.breed);
  parts.push(sex, p.age);
  if (p.hasVideo) parts.push("with video");
  return parts.join(", ");
}

export function MeetPups() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mq = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (!mq.matches) {
        track.style.transform = "";
        return;
      }
      const rect = pin.getBoundingClientRect();
      const total = Math.max(pin.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const maxX = Math.max(track.scrollWidth - window.innerWidth * 0.5, 0);
      track.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  const doors = availablePuppies;
  const pinH = `calc(${Math.max(doors.length * 145, 1400)}px + 100vh)`;

  return (
    <section
      data-pup-scene="true"
      className="tp-scene tp-meet"
      data-pinned=""
      aria-labelledby="meet-title"
      style={{ ["--pin-h" as string]: pinH } as CSSProperties}
    >
      <div ref={pinRef} data-pin-range="true" className="tp-meet__pin">
        <div className="tp-meet__stage">
          <header className="tp-meet__head gutter">
            <div>
              <h2 id="meet-title" className="font-plush text-huge">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link className="btn btn-primary shrink-0" href="/puppies">
              See all available puppies
            </Link>
          </header>

          <div className="tp-meet__hall">
            <ol
              ref={trackRef}
              className="tp-meet__track"
              aria-label="Puppies looking for a family"
            >
              {doors.map((pup, i) => (
                <li key={pup.slug} className="tp-door" data-open="false">
                  <Link
                    className="tp-door__link"
                    href={`/puppies/${pup.slug}`}
                    style={{ "--door": DOOR_COLORS[i % DOOR_COLORS.length] } as CSSProperties}
                  >
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">{pup.name}</span>
                      <span className="tp-door__meta">{metaFor(pup)}</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <Image
                          src={pup.image}
                          alt={`${pup.name}, ${pup.breed} puppy`}
                          fill
                          sizes="(min-width: 1024px) 15rem, 44vw"
                          className="object-cover"
                        />
                      </span>
                      <span aria-hidden className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg
                            viewBox="0 0 64 64"
                            className="tp-door__peephole"
                            aria-hidden
                            fill="currentColor"
                          >
                            <path d={PAW_PATH} />
                          </svg>
                          <span className="tp-door__knob" />
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="tp-door tp-door--all" data-open="false">
                <Link className="tp-door__link" href="/puppies">
                  <span className="tp-door__frame tp-door__frame--all">
                    <span className="font-plush tp-door__all">Meet them all</span>
                  </span>
                </Link>
              </li>
            </ol>

            <div aria-hidden className="tp-meet__floor" />
            <div
              data-pup-stop="true"
              data-pose="walk"
              data-facing="right"
              data-act="treadmill"
              className="pup-stop tp-meet__teddy"
            >
              <TeddyWalk />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

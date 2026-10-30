"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { TeddySit } from "@/components/TeddySit";
import { media, site } from "@/lib/site";

const STEPS = [
  {
    title: "Choose your breed",
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    title: "Get photos & details",
    text: "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
  },
  {
    title: "Secure & safe delivery",
    text: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
  },
] as const;

const BREEDS = [
  { label: "Maltipoo", href: "/puppies?breed=maltipoo" },
  { label: "Pomeranian", href: "/puppies?breed=pomeranian" },
  { label: "Poodle", href: "/puppies?breed=poodle" },
  { label: "Cavapoo", href: "/puppies?breed=cavapoo" },
  { label: "Shih Tzu", href: "/puppies?breed=shih-tzu" },
] as const;

const SNAPS = [
  {
    src: media(
      "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
    ),
    alt: "A tiny apricot teddy bear puppy held up in the TeddyPups showroom",
    pos: "54.3% 48.3%",
  },
  {
    src: media(
      "/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
    ),
    alt: "The apricot teddy bear puppy from our showroom, close up",
    pos: "46% 44.4%",
  },
  {
    src: media(
      "/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
    ),
    alt: "The apricot teddy bear puppy from our showroom, looking up",
    pos: "43.7% 40.2%",
  },
  {
    src: media(
      "/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg",
    ),
    alt: "The apricot teddy bear puppy from our showroom, held up to say hello",
    pos: "45.3% 44.4%",
  },
] as const;

const VIDEO = "/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4";
const POSTER = media(
  "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
);

const PAW =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

function DeliveryRoute() {
  return (
    <svg viewBox="0 0 220 70" className="tp-route" aria-hidden>
      <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line" />
      <circle cx="14" cy="52" r="5" className="tp-route__dot" />
      <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
      <path
        d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
        className="tp-route__heart"
      />
      <path
        d={PAW}
        transform="translate(70 22) scale(.3) rotate(70 32 32)"
        className="tp-route__paw"
      />
      <path
        d={PAW}
        transform="translate(104 38) scale(.3) rotate(100 32 32)"
        className="tp-route__paw"
      />
    </svg>
  );
}

function ClipPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="tp-clip">
      <video
        ref={videoRef}
        src={VIDEO}
        poster={POSTER}
        loop
        playsInline
        preload="none"
        aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <button
        type="button"
        className="tp-clip__play"
        aria-pressed={playing}
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          {playing ? (
            <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </button>
    </div>
  );
}

export function PuppyJourney() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLLIElement);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat"
      aria-labelledby="journey-title"
      style={
        {
          ["--sky-top"]: "#f7d18d",
          ["--sky-bottom"]: "#f0b866",
        } as CSSProperties
      }
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely
            joyful.
          </p>
          <ol className="tp-chat__steps">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="tp-chat__step"
                data-done={i < active ? "true" : undefined}
                data-active={i === active ? "true" : undefined}
              >
                <span className="tp-chat__num font-plush" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="font-plush tp-chat__title">{step.title}</h3>
                <p className="tp-chat__text">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
            How it works
          </Link>
        </div>

        <div className="tp-chat__side">
          <div
            className="tp-phone"
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            role="group"
          >
            <div className="tp-phone__bar">
              <Image
                src={site.logo}
                alt=""
                width={40}
                height={40}
                className="tp-phone__avatar"
              />
              <span>
                <span className="tp-phone__name">{site.fullName}</span>
                <span className="tp-phone__status">online</span>
              </span>
            </div>

            <div className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I&apos;d love to know more about your puppies.
              </p>

              <div className="tp-msg-group" data-step="0" data-show={active >= 0 ? "true" : "false"}>
                <div className="tp-msg tp-msg--them">
                  <p>{STEPS[0].text}</p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    {BREEDS.map((b) => (
                      <li key={b.label}>
                        <Link href={b.href}>{b.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="tp-msg-group" data-step="1" data-show={active >= 1 ? "true" : "false"}>
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    {SNAPS.map((s) => (
                      <span key={s.src} className="tp-snaps__one">
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          sizes="9rem"
                          className="object-cover"
                          style={{ objectPosition: s.pos }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <ClipPlayer />
                </div>
                <p className="tp-msg tp-msg--them">{STEPS[1].text}</p>
              </div>

              <div className="tp-msg-group" data-step="2" data-show={active >= 2 ? "true" : "false"}>
                <div className="tp-msg tp-msg--them">
                  <p>{STEPS[2].text}</p>
                  <DeliveryRoute />
                </div>
              </div>

              <p className="tp-typing" data-show="false" aria-hidden>
                <span />
                <span />
                <span />
              </p>
            </div>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>

          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-chat__teddy"
          >
            <TeddySit />
          </div>
        </div>
      </div>
    </section>
  );
}

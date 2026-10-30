import type { CSSProperties } from "react";
import Link from "next/link";
import { TeddySit } from "@/components/TeddySit";
import { homeFaqs } from "@/data/faqs";

const STAR =
  "M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z";

const STARS = [
  { left: "8%", top: "12%", width: 16.2, delay: "0s" },
  { left: "22%", top: "30%", width: 9, delay: "0.4s" },
  { left: "41%", top: "8%", width: 12.6, delay: "0.8s" },
  { left: "57%", top: "22%", width: 8.1, delay: "1.2s" },
  { left: "72%", top: "6%", width: 14.4, delay: "1.6s" },
  { left: "88%", top: "18%", width: 10.8, delay: "2s" },
  { left: "95%", top: "42%", width: 9, delay: "2.4s" },
  { left: "4%", top: "58%", width: 10.8, delay: "2.8s" },
  { left: "34%", top: "70%", width: 7.2, delay: "3.2s" },
  { left: "63%", top: "84%", width: 9.9, delay: "3.6s" },
  { left: "83%", top: "66%", width: 12.6, delay: "4s" },
];

export function QuestionsNight() {
  return (
    <div data-section="questions">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-night"
        aria-labelledby="questions-title"
        style={
          {
            ["--sky-top"]: "#4d2b19",
            ["--sky-bottom"]: "#2f1a10",
          } as CSSProperties
        }
      >
        <div aria-hidden className="pointer-events-none tp-night__stars">
          {STARS.map((s) => (
            <svg
              key={`${s.left}-${s.top}`}
              viewBox="0 0 40 40"
              className="tp-twinkle absolute text-honey"
              aria-hidden
              style={{
                left: s.left,
                top: s.top,
                width: s.width,
                animationDelay: s.delay,
              }}
            >
              <path d={STAR} fill="currentColor" />
            </svg>
          ))}
        </div>

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 id="questions-title" className="font-plush text-huge">
              Questions, answered
            </h2>
            <Link className="btn btn-ghost tp-night__cta" href="/faq">
              Read all questions
            </Link>
            <div className="tp-night__pup">
              <span aria-hidden className="tp-night__wonder font-plush">
                ?
              </span>
              <div
                data-pup-stop="true"
                data-pose="sit"
                data-facing="right"
                data-act="tilt"
                className="pup-stop tp-night__teddy"
              >
                <TeddySit />
              </div>
            </div>
          </div>

          <dl className="tp-night__list">
            {homeFaqs.map((item) => (
              <div key={item.q} className="tp-qa">
                <dt className="font-plush tp-qa__q">
                  <svg viewBox="0 0 40 40" className="tp-qa__star" aria-hidden>
                    <path d={STAR} fill="currentColor" />
                  </svg>
                  {item.q}
                </dt>
                <dd className="tp-qa__a">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

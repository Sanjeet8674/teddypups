import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Puppy } from "@/data/puppies";

const WASHES = ["#f2be6b", "#bfddf5", "#fbe3b4", "#e8c39a", "#f9cdbf"] as const;

const BLOB =
  "M96.7 50C96.4 52.4 95.9 54.7 95.3 57C94.8 59.2 94.1 61.4 93.3 63.6C92.5 65.8 91.6 67.9 90.6 70C89.5 72 88.3 74.1 86.9 76C85.6 77.8 84 79.6 82.3 81.3C80.7 82.9 78.8 84.4 76.9 85.8C75 87.2 72.9 88.4 70.8 89.5C68.7 90.6 66.5 91.6 64.3 92.4C62 93.3 59.7 94 57.3 94.6C54.9 95.2 52.5 95.6 50 95.8C47.5 96 45 96.1 42.5 95.8C40 95.6 37.5 95.2 35.1 94.4C32.7 93.8 30.3 92.8 28.1 91.6C25.9 90.5 23.7 89.1 21.8 87.6C19.8 86.1 18 84.4 16.2 82.7C14.5 80.9 12.9 79.1 11.4 77.1C9.9 75.2 8.5 73.2 7.2 71.1C5.9 69 4.8 66.8 3.8 64.5C2.9 62.2 2 59.8 1.5 57.4C1 55 0.8 52.5 0.8 50C0.9 47.5 1.2 45 1.8 42.6C2.4 40.2 3.4 37.9 4.4 35.7C5.5 33.5 6.9 31.4 8.3 29.5C9.7 27.5 11.4 25.7 13 24C14.6 22.3 16.4 20.7 18.2 19.2C19.9 17.7 21.8 16.3 23.7 15C25.6 13.7 27.6 12.4 29.6 11.4C31.7 10.3 33.9 9.3 36.1 8.5C38.3 7.7 40.6 7.1 42.9 6.6C45.2 6.1 47.6 5.8 50 5.7C52.4 5.5 54.8 5.5 57.3 5.6C59.7 5.7 62.2 6 64.6 6.4C67.1 6.9 69.6 7.4 72 8.2C74.5 9 76.9 9.9 79.2 11.1C81.5 12.3 83.8 13.7 85.8 15.4C87.8 17.1 89.6 19 91.2 21.1C92.7 23.2 93.9 25.5 94.9 27.9C95.9 30.2 96.5 32.8 96.9 35.3C97.3 37.7 97.4 40.3 97.4 42.7C97.4 45.2 97.1 47.6 96.7 50Z";

const MASK =
  "M96.9 50C97.1 52.5 96.9 55.1 96.5 57.6C96.1 60 95.4 62.5 94.6 64.8C93.7 67.2 92.5 69.4 91.3 71.5C90 73.7 88.5 75.7 87 77.5C85.4 79.4 83.7 81.1 81.9 82.7C80.1 84.2 78.2 85.7 76.2 87C74.2 88.2 72.1 89.3 70 90.3C67.9 91.2 65.7 91.9 63.5 92.5C61.3 93.1 59 93.4 56.8 93.7C54.5 93.9 52.2 93.9 50 93.9C47.8 93.8 45.5 93.6 43.3 93.3C41.1 93 38.9 92.6 36.7 92C34.5 91.5 32.3 90.9 30.1 90.1C27.9 89.3 25.7 88.3 23.6 87.2C21.5 86.1 19.5 84.8 17.6 83.2C15.7 81.7 13.9 79.9 12.4 78C10.8 76.1 9.5 74 8.3 71.8C7.2 69.5 6.4 67.1 5.7 64.8C5 62.4 4.6 59.9 4.4 57.4C4.1 55 4.1 52.5 4.2 50C4.3 47.6 4.6 45.1 5.1 42.7C5.5 40.3 6.1 37.9 6.9 35.6C7.6 33.3 8.5 31.1 9.7 28.9C10.8 26.8 12 24.7 13.5 22.8C14.9 20.9 16.6 19.1 18.3 17.5C20 15.9 21.9 14.4 23.8 13.1C25.8 11.8 27.9 10.7 29.9 9.7C32 8.7 34.2 7.8 36.4 7.1C38.6 6.4 40.8 5.8 43.1 5.4C45.4 5 47.7 4.7 50 4.7C52.3 4.6 54.7 4.7 57 5C59.2 5.4 61.6 5.9 63.7 6.7C65.9 7.4 68.1 8.4 70.1 9.5C72.2 10.7 74.1 12 75.9 13.4C77.8 14.9 79.5 16.5 81.1 18.1C82.8 19.8 84.3 21.5 85.8 23.4C87.2 25.2 88.6 27.1 89.9 29.2C91.1 31.2 92.4 33.3 93.3 35.6C94.3 37.8 95.2 40.2 95.8 42.6C96.4 45 96.8 47.5 96.9 50Z";

const DOODLE_COLORS = ["#c2622b", "#a24a1a", "#d4893f", "#2a170e"] as const;

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function maskUrl(path: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${path}" fill="#000"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function puppyMeta(puppy: Puppy) {
  const sex = puppy.sex.toLowerCase();
  if (puppy.name === puppy.breed) return `${sex} · ${puppy.age}`;
  return `${puppy.breed} · ${sex} · ${puppy.age}`;
}

type SketchPuppyProps = {
  puppy: Puppy;
  index?: number;
  small?: boolean;
  focus?: string;
};

export function SketchPuppy({
  puppy,
  index = 0,
  small = false,
  focus = "50% 45%",
}: SketchPuppyProps) {
  const h = hashSlug(puppy.slug);
  const wash = WASHES[h % WASHES.length];
  const tilt = (((h % 50) / 50) * 4.4 - 2.2).toFixed(2);
  const delay = (index % 8) * 70;
  const washShiftX = ((h % 17) - 8) * 0.4;
  const washShiftY = 3 + (h % 7) * 0.5;
  const doodle = DOODLE_COLORS[h % DOODLE_COLORS.length];
  const gone = puppy.status === "gone";

  const style = {
    ["--tilt" as string]: `${tilt}deg`,
    ["--d" as string]: `${delay}ms`,
    ["--wash" as string]: wash,
  } as CSSProperties;

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className={`tp-sketch${small ? " tp-sketch--small" : ""}`}
      data-reveal="true"
      data-armed="true"
      data-revealed="true"
      aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.sex.toLowerCase()}, ${puppy.age}, ${gone ? "gone home" : "available"}`}
      style={style}
    >
      <span className="tp-sketch__frame">
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="tp-sketch__wash"
          style={{ translate: `${washShiftX}% ${washShiftY}%` }}
        >
          <path d={BLOB} />
        </svg>

        <span
          className="tp-sketch__photo"
          style={{ maskImage: maskUrl(MASK), WebkitMaskImage: maskUrl(MASK) }}
        >
          <Image
            src={puppy.image}
            alt=""
            fill
            sizes={
              small
                ? "(min-width: 640px) 8rem, 30vw"
                : "(min-width: 1536px) 17rem, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
            }
            className="object-cover"
            style={{ objectPosition: focus }}
            priority={index < 3}
          />
        </span>

        <svg aria-hidden viewBox="0 0 100 100" className="tp-sketch__ink">
          <path d={BLOB} pathLength={1} className="tp-sketch__line" />
          <path
            d="M37.5 95.8C36.6 95.5 33.6 94.7 31.8 94C29.9 93.3 28 92.5 26.3 91.6C24.5 90.6 22.7 89.6 21.1 88.4C19.5 87.2 17.9 85.9 16.5 84.5C15 83.1 13.7 81.5 12.5 79.9C11.2 78.4 10.1 76.7 9 74.9C8 73.2 7.1 71.4 6.2 69.6C5.4 67.8 4.6 65.9 3.9 64C3.3 62.1 2.7 60.1 2.3 58.2C1.8 56.2 1.4 54.2 1.2 52.1C1 50.1 0.9 48 1 46C1 43.9 1.2 41.8 1.6 39.8C1.9 37.8 2.4 35.7 3.1 33.8C3.8 31.8 4.6 29.8 5.5 28C6.4 26.1 7.5 24.3 8.7 22.6C9.8 20.9 11.1 19.2 12.5 17.6C13.8 16.1 15.3 14.5 16.8 13.1C18.3 11.7 19.9 10.3 21.5 9C23.2 7.7 24.9 6.5 26.7 5.4C28.5 4.3 30.4 3.2 32.4 2.4C34.4 1.6 36.4 0.8 38.5 0.3C40.6 -0.2 42.7 -0.6 44.9 -0.8C47 -0.9 49.2 -0.9 51.3 -0.7C53.4 -0.4 55.6 0 57.6 0.6C59.6 1.2 61.6 2 63.5 2.9C65.4 3.7 67.2 4.8 69 5.9C70.7 6.9 72.3 8.1 73.9 9.4C75.5 10.6 77 11.9 78.5 13.2C79.9 14.5 82 16.6 82.7 17.3"
            pathLength={1}
            className="tp-sketch__line tp-sketch__line--retrace"
          />
          <g transform={`translate(${(h % 20) - 6} ${(h % 30) + 8}) rotate(${(h % 30) - 15}) scale(0.95)`}>
            <g className="tp-sketch__doodle">
              {h % 3 === 0 ? (
                <path
                  d="M0 -6c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6z"
                  fill={doodle}
                />
              ) : h % 3 === 1 ? (
                <g fill={doodle}>
                  <circle cx="-4" cy="1" r="1.2" />
                  <circle cx="0" cy="-2" r="1.2" />
                  <circle cx="4" cy="1" r="1.2" />
                </g>
              ) : (
                <path
                  d="M0 5C-4.6 1.8-6.4-.8-6.4-3.2c0-1.9 1.5-3.3 3.3-3.3 1.3 0 2.4.7 3.1 1.9.7-1.2 1.8-1.9 3.1-1.9 1.8 0 3.3 1.4 3.3 3.3C6.4-.8 4.6 1.8 0 5z"
                  fill="none"
                  stroke={doodle}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </g>
          </g>
          <g
            transform={`translate(${90 + (h % 12)} ${40 + (h % 40)}) rotate(${(h % 40) - 20}) scale(0.9)`}
          >
            <g className="tp-sketch__doodle">
              <path
                d="M-5 -5l4 2M-6 0h5M-5 5l4 -2"
                fill="none"
                stroke={doodle}
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        <span
          className={`tp-sketch__sticker font-scrawl${gone ? " tp-sketch__sticker--home" : ""}`}
        >
          {gone ? "gone home ♥" : "Available"}
        </span>
        {puppy.hasVideo && !gone ? <span className="tp-sketch__video">▶ video</span> : null}
      </span>
      <span className="tp-sketch__name font-plush">{puppy.name}</span>
      {!small ? <span className="tp-sketch__meta">{puppyMeta(puppy)}</span> : null}
    </Link>
  );
}

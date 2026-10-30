"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TeddyPeek } from "@/components/TeddyPeek";
import { TeddySit } from "@/components/TeddySit";
import { TeddySnug } from "@/components/TeddySnug";
import { TeddyWalk } from "@/components/TeddyWalk";

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

/** Feet anchor inside the 300×240 Teddy SVG (matches live). */
const ANCHOR = { x: 150, y: 228 };

type Pose = "peek" | "sit" | "walk" | "snug" | "bow" | "stand" | "hop";

type Stop = {
  el: HTMLElement;
  pageX: number;
  pageY: number;
  scale: number;
  pose: Pose;
  facing: 1 | -1;
  behind: boolean;
  mid: number;
};

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

function smooth(t: number) {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function readPose(raw: string | undefined): Pose {
  if (
    raw === "peek" ||
    raw === "walk" ||
    raw === "snug" ||
    raw === "bow" ||
    raw === "stand" ||
    raw === "hop"
  ) {
    return raw;
  }
  return "sit";
}

function measureStops(): Stop[] {
  return [...document.querySelectorAll<HTMLElement>("[data-pup-stop]")]
    .filter((el) => el.getClientRects().length > 0)
    .map((el) => {
      const r = el.getBoundingClientRect();
      const scale = r.width / 300;
      return {
        el,
        pageX: r.left + window.scrollX + ANCHOR.x * scale,
        pageY: r.top + window.scrollY + ANCHOR.y * scale,
        scale,
        pose: readPose(el.dataset.pose),
        facing: el.dataset.facing === "left" ? (-1 as const) : (1 as const),
        behind: el.dataset.behind === "true",
        mid: r.top + window.scrollY + r.height * 0.45,
      };
    })
    .sort((a, b) => a.mid - b.mid);
}

function PoseBody({ pose, facing }: { pose: Pose; facing: 1 | -1 }) {
  const flip = facing < 0 ? "scaleX(-1)" : undefined;
  const wrap = (node: ReactNode) => (
    <div style={{ transform: flip, transformOrigin: "center" }}>{node}</div>
  );

  if (pose === "peek") return wrap(<TeddyPeek />);
  if (pose === "snug") return wrap(<TeddySnug />);
  if (pose === "walk" || pose === "stand" || pose === "hop") return wrap(<TeddyWalk />);
  return wrap(<TeddySit />);
}

/**
 * Scroll companion from the live TeddyPups site: one floating Teddy that
 * walks between `[data-pup-stop]` waypoints as you scroll the homepage.
 */
export function PupJourney() {
  const layerRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>("peek");
  const [facing, setFacing] = useState<1 | -1>(1);
  const poseRef = useRef<Pose>("peek");
  const facingRef = useRef<1 | -1>(1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const layer = layerRef.current;
    const actor = actorRef.current;
    const body = bodyRef.current;
    const prints = printsRef.current;
    if (!layer || !actor || !body || !prints) return;

    const printSvgs = [...prints.querySelectorAll("svg")];
    let printI = 0;
    let stops = measureStops();
    let active = false;

    const html = document.documentElement;
    let raf = 0;
    let lastPrintDist = 0;
    let lastX = 0;
    let lastY = 0;
    let lastScroll = window.scrollY;
    let holdingK = -1;

    const applyPose = (next: Pose, face: 1 | -1) => {
      if (poseRef.current !== next) {
        poseRef.current = next;
        setPose(next);
      }
      if (facingRef.current !== face) {
        facingRef.current = face;
        setFacing(face);
      }
    };

    const ensureActive = () => {
      stops = measureStops();
      if (stops.length < 2) {
        if (active) {
          active = false;
          delete html.dataset.pup;
          layer.hidden = true;
        }
        return false;
      }
      if (!active) {
        active = true;
        html.dataset.pup = "live";
        layer.hidden = false;
      }
      return true;
    };

    const tick = () => {
      if (!ensureActive()) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const scrollY = window.scrollY;
      const viewMid = scrollY + window.innerHeight * 0.52;
      let k = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        if (viewMid >= stops[i]!.mid && viewMid < stops[i + 1]!.mid) {
          k = i;
          break;
        }
        if (viewMid >= stops[i + 1]!.mid) k = i + 1;
      }
      k = Math.min(k, stops.length - 2);

      const a = stops[k]!;
      const b = stops[k + 1]!;
      const span = Math.max(1, b.mid - a.mid);
      const rawT = clamp((viewMid - a.mid) / span);
      const t = smooth(rawT);

      const hold = rawT < 0.12 || rawT > 0.88;
      const atEnd = rawT > 0.88;
      const held = atEnd ? b : a;

      const pageX = lerp(a.pageX, b.pageX, t);
      const pageY = lerp(a.pageY, b.pageY, t);
      const scale = lerp(a.scale, b.scale, t);
      const x = pageX - window.scrollX;
      const y = pageY - window.scrollY;

      const arc = hold ? 0 : Math.sin(rawT * Math.PI) * Math.min(36 * scale, 48);
      const drawY = y - arc;

      actor.style.transform = `translate3d(${(x - ANCHOR.x * scale).toFixed(2)}px, ${(drawY - ANCHOR.y * scale).toFixed(2)}px, 0)`;
      body.style.transform = `scale(${scale.toFixed(4)})`;
      layer.dataset.front = held.behind && hold ? "false" : "true";
      actor.dataset.holding = hold ? "true" : "false";

      const dx = x - lastX;
      const dy = drawY - lastY;
      const dist = Math.hypot(dx, dy);
      lastPrintDist += dist;

      if (hold) {
        applyPose(held.pose === "bow" ? "sit" : held.pose, held.facing);
        holdingK = atEnd ? k + 1 : k;
        lastPrintDist = 0;
      } else {
        holdingK = -1;
        const face: 1 | -1 =
          Math.abs(dx) > 0.4 ? (dx > 0 ? 1 : -1) : facingRef.current;
        applyPose("walk", face);

        if (lastPrintDist > 34 * scale && printSvgs.length) {
          lastPrintDist = 0;
          const svg = printSvgs[printI++ % printSvgs.length]!;
          const angle =
            Math.atan2(dy + (scrollY - lastScroll), dx) + Math.PI / 2;
          const size = 14 * Math.max(0.75, 1.5 * scale);
          const px = x - ANCHOR.x * scale + (face > 0 ? 186 : 110) * scale;
          const py = drawY - ANCHOR.y * scale + 226 * scale;
          svg.style.transform = `translate(${(px - size / 2).toFixed(1)}px, ${(py - size / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
          svg.style.width = svg.style.height = `${size.toFixed(1)}px`;
          svg.animate(
            [
              { opacity: 0 },
              { opacity: 0.45, offset: 0.08 },
              { opacity: 0.45, offset: 0.5 },
              { opacity: 0 },
            ],
            { duration: 2600, easing: "ease-out" },
          );
        }
      }

      stops.forEach((s, i) => {
        const scene = s.el.closest<HTMLElement>("[data-pup-scene]");
        if (!scene) return;
        const here = hold && i === holdingK;
        scene.dataset.here = String(here);
        scene.dataset.visited = String(i <= Math.max(holdingK, k));
      });

      lastX = x;
      lastY = drawY;
      lastScroll = scrollY;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      stops = measureStops();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      delete html.dataset.pup;
      layer.hidden = true;
    };
  }, []);

  return (
    <>
      <div ref={printsRef} aria-hidden className="pup-prints">
        {Array.from({ length: 24 }, (_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>
      <div
        ref={layerRef}
        aria-hidden
        className="pup-layer"
        hidden
        data-front="true"
      >
        <div ref={actorRef} className="pup-actor">
          <div ref={bodyRef} className="pup-actor__body">
            <PoseBody pose={pose} facing={facing} />
          </div>
          <span className="pup-bubble-at">
            <span className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}

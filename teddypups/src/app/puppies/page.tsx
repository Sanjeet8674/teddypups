import type { Metadata } from "next";
import { Suspense } from "react";
import { PuppiesSketchbook } from "@/components/PuppiesSketchbook";

export const metadata: Metadata = {
  title: "Available puppies",
};

export default function PuppiesPage() {
  return (
    <section aria-labelledby="pups-title">
      <Suspense fallback={<div className="gutter py-16 text-cocoa-soft">Loading sketchbook…</div>}>
        <PuppiesSketchbook />
      </Suspense>
    </section>
  );
}

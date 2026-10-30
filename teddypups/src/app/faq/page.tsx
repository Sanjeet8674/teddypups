import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { faqs } from "@/data/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions & answers",
};

export default function FaqPage() {
  return (
    <div className="section-pad py-12 md:py-16">
      <div className="prose-max max-w-3xl">
        <h1 className="font-plush text-4xl font-extrabold tracking-tight md:text-5xl">
          Questions & answers
        </h1>
        <p className="mt-4 text-cocoa/75">
          Can&apos;t find what you&apos;re looking for? Message us on{" "}
          <a href={site.whatsapp} className="font-semibold text-whatsapp underline">
            WhatsApp
          </a>{" "}
          — our team is available 24/7.
        </p>
        <div className="mt-10">
          <FaqList items={faqs} />
        </div>
      </div>
    </div>
  );
}

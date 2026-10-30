"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export function FaqList({ items }: { items: readonly Item[] | Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-cocoa/10 border-y border-cocoa/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.q}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <h3 className="font-plush text-lg font-bold text-cocoa md:text-xl">{item.q}</h3>
              <span
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cocoa/20 text-lg transition ${
                  isOpen ? "rotate-45 bg-cocoa text-cream" : "bg-cream"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-cocoa/75">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

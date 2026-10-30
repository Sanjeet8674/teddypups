import type { Metadata } from "next";
import { PuppyCard } from "@/components/PuppyCard";
import { goneHomePuppies } from "@/data/puppies";

export const metadata: Metadata = {
  title: "Gone home",
};

export default function GoneHomePage() {
  return (
    <div className="section-pad py-12 md:py-16">
      <div className="prose-max">
        <p className="font-scrawl text-caramel">already snuggled in</p>
        <h1 className="font-plush mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
          Gone home
        </h1>
        <p className="mt-4 max-w-2xl text-cocoa/75">
          These puppies have found their families.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-5">
          {goneHomePuppies.map((puppy) => (
            <PuppyCard key={puppy.slug} puppy={puppy} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

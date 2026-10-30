import Image from "next/image";
import Link from "next/link";
import type { Puppy } from "@/data/puppies";

export function PuppyCard({ puppy, compact = false }: { puppy: Puppy; compact?: boolean }) {
  const gone = puppy.status === "gone";

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group relative block overflow-hidden rounded-[1.75rem] border-2 border-cocoa/10 bg-white shadow-[0_4px_0_rgba(42,23,14,0.08)] transition hover:-translate-y-0.5 hover:border-caramel/40"
    >
      <div className={`relative overflow-hidden ${compact ? "aspect-[4/5]" : "aspect-[5/6]"}`}>
        <Image
          src={puppy.image}
          alt={`${puppy.name}, ${puppy.breed} puppy`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              gone ? "bg-caramel text-cream" : "bg-cream text-cocoa"
            }`}
          >
            {gone ? "gone home ♥" : "Available"}
          </span>
          {puppy.hasVideo && !gone && (
            <span className="rounded-full bg-cocoa/80 px-2.5 py-1 text-xs font-bold text-cream">
              ▶ video
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="font-plush text-xl font-extrabold leading-tight">{puppy.name}</p>
        <p className="mt-1 text-sm font-medium text-cocoa/70">
          {puppy.breed}
          <span className="mx-1.5 text-cocoa/30">·</span>
          {puppy.sex.toLowerCase()}
          <span className="mx-1.5 text-cocoa/30">·</span>
          {puppy.age}
        </p>
      </div>
    </Link>
  );
}

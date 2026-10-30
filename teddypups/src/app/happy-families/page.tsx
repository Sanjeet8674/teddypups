import type { Metadata } from "next";
import Image from "next/image";
import { familyMoments, testimonial } from "@/data/families";

export const metadata: Metadata = {
  title: "Happy families",
};

export default function HappyFamiliesPage() {
  return (
    <div className="section-pad py-12 md:py-16">
      <div className="prose-max">
        <h1 className="font-plush text-4xl font-extrabold tracking-tight md:text-5xl">
          Happy families
        </h1>
        <p className="mt-4 max-w-2xl text-cocoa/75">
          Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful
          moments shared by our amazing clients after welcoming their furry friends.
        </p>
        <p className="font-scrawl mt-4 text-caramel">64 moments and counting</p>

        <blockquote className="mt-10 max-w-3xl rounded-[1.75rem] border-2 border-cocoa/10 bg-white p-6 md:p-8">
          <p className="font-plush text-xl leading-snug md:text-2xl">“{testimonial.quote}”</p>
          <footer className="mt-4 text-sm font-semibold text-caramel">{testimonial.author}</footer>
        </blockquote>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {familyMoments.map((moment) => (
            <li
              key={moment.caption}
              className="group relative aspect-square overflow-hidden rounded-[1.25rem] border-2 border-cocoa/10 bg-white"
            >
              <Image
                src={moment.image}
                alt={moment.caption}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 to-transparent p-3 pt-10">
                <p className="text-xs font-semibold text-cream md:text-sm">{moment.caption}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="font-scrawl mt-12 text-center text-lg text-caramel">
          every one of them was a Teddy Pup once
        </p>
      </div>
    </div>
  );
}

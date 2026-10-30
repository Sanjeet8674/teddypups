"use client";

import { FormEvent, useMemo, useState } from "react";
import { puppySelectOptions } from "@/data/puppies";
import { site } from "@/lib/site";

type Props = {
  defaultPuppy?: string;
  title?: string;
  intro?: string;
};

export function ContactForm({
  defaultPuppy = "",
  title = "Get in touch with us",
  intro = "Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [puppy, setPuppy] = useState(defaultPuppy);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const puppyLabel = useMemo(() => {
    if (!puppy) return "any puppy (not sure yet)";
    return puppySelectOptions.find((o) => o.value === puppy)?.label ?? puppy;
  }, [puppy]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (honeypot) return;
    if (!name.trim() || !phone.trim()) {
      setError("Please share your name and phone / WhatsApp number.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    const text = encodeURIComponent(
      `Hi TeddyPups! I'm ${name}. Phone: ${phone}${email ? `, email: ${email}` : ""}${
        area ? `, area: ${area}` : ""
      }. Interested in: ${puppyLabel}.${message ? ` Message: ${message}` : ""}`,
    );
    return (
      <div className="rounded-[2rem] border-2 border-cocoa/10 bg-white p-8 text-center shadow-[0_6px_0_rgba(42,23,14,0.06)] md:p-12">
        <p className="font-scrawl text-caramel">letter posted ♥</p>
        <h2 className="mt-2 font-plush text-3xl font-extrabold">Thank you, {name}!</h2>
        <p className="mx-auto mt-3 max-w-md text-cocoa/75">
          We&apos;ve got your note. For the quickest reply, continue on WhatsApp — our team is
          available 24/7.
        </p>
        <a
          href={`https://wa.me/971541676733?text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-6 h-12 px-6"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-plush text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-cocoa/75">{intro}</p>

      <form
        onSubmit={onSubmit}
        className="relative mt-10 rounded-[2rem] border-2 border-cocoa/10 bg-white p-6 shadow-[0_6px_0_rgba(42,23,14,0.06)] md:p-10"
      >
        <p className="font-scrawl text-caramel">Dear TeddyPups,</p>
        <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-cocoa/90 md:text-lg">
          <p>
            my name is{" "}
            <input
              className="letter-field min-w-[10rem]"
              placeholder="Your name (required)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Your name"
            />
            , and you can reach me on{" "}
            <input
              className="letter-field min-w-[14rem]"
              placeholder="Phone or WhatsApp number with country code (required)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-label="Phone or WhatsApp"
            />{" "}
            or by email at{" "}
            <input
              className="letter-field min-w-[12rem]"
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            .
          </p>
          <p>
            I live in{" "}
            <input
              className="letter-field min-w-[10rem]"
              placeholder="Your area (optional)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              aria-label="Area"
            />
            , and I&apos;m curious about{" "}
            <select
              className="letter-field min-w-[14rem] cursor-pointer appearance-none bg-transparent"
              value={puppy}
              onChange={(e) => setPuppy(e.target.value)}
              aria-label="Puppy you're interested in"
            >
              <option value="">any puppy (not sure yet)</option>
              {puppySelectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            .
          </p>
          <div>
            <label className="font-scrawl text-sm text-caramel" htmlFor="message">
              Your message (optional)
            </label>
            <textarea
              id="message"
              className="mt-2 w-full resize-y rounded-2xl border border-cocoa/15 bg-cream/60 p-4 text-base outline-none focus:border-caramel"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us a little about the puppy (or family) you're dreaming of…"
            />
          </div>
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            aria-hidden
          />
        </div>

        <p className="mt-8 font-scrawl text-caramel">with love, a future puppy parent</p>

        {error && <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>}

        <button type="submit" className="btn btn-primary mt-6 h-12 px-8 text-base">
          Post my letter
        </button>

        <p className="mt-4 text-sm text-cocoa/60">
          Prefer a quick chat?{" "}
          <a href={site.whatsapp} className="font-semibold text-whatsapp underline">
            WhatsApp {site.phone}
          </a>
        </p>
      </form>
    </div>
  );
}

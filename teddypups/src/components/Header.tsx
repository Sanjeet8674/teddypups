"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.setAttribute("data-closing", "");
      const done = (e: AnimationEvent) => {
        if (e.target !== dialog) return;
        dialog.removeAttribute("data-closing");
        dialog.close();
        dialog.removeEventListener("animationend", done);
      };
      dialog.addEventListener("animationend", done);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className="tp-header"
      data-home={isHome ? "true" : undefined}
      data-scrolled={scrolled ? "true" : undefined}
      data-hidden={hidden && !open ? "true" : undefined}
    >
      <div className="tp-header__bar gutter">
        <Link href="/" className="tp-header__brand" aria-label={`${site.fullName} — home`}>
          <Image
            src={site.logo}
            alt=""
            width={56}
            height={56}
            className="tp-header__logo"
            priority
          />
          <span className="font-plush tp-header__name">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="tp-header__nav">
          <ul>
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="tp-nav-link"
                    data-active={active ? "true" : "false"}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <PawMark className="tp-nav-link__paw" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="tp-header__end">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp tp-header__wa"
          >
            WhatsApp us
          </a>
          <button
            type="button"
            className="tp-header__menu-btn"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <PawMark className="size-4" />
            Menu
          </button>

          <dialog
            ref={dialogRef}
            aria-label="Site menu"
            className="tp-menu"
            onCancel={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            onClick={(e) => {
              if (e.target === dialogRef.current) setOpen(false);
            }}
          >
            <div className="tp-menu__inner gutter">
              <div className="flex items-center justify-between">
                <span className="font-scrawl text-lg text-toffee-ink">where to, friend?</span>
                <button
                  type="button"
                  className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex-1">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const active =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="tp-menu-link font-plush"
                          data-active={active ? "true" : "false"}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          <span>{link.label}</span>
                          <PawMark className="tp-nav-link__paw" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="space-y-3 pb-[env(safe-area-inset-bottom)]">
                <a
                  href={site.whatsapp}
                  className="btn btn-whatsapp w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
                <p className="text-center text-sm font-medium">{site.phone}</p>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <svg
        className="tp-header__hem"
        viewBox="0 0 1440 18"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className="tp-header__hem-fill"
          d="M0,0 H1440 V8 C1200,18 960,2 720,10 C480,18 240,2 0,12 Z"
        />
        <path
          className="tp-header__hem-line"
          d="M0,10 C240,2 480,18 720,10 C960,2 1200,18 1440,8"
        />
      </svg>
    </header>
  );
}

function PawMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="currentColor">
      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
    </svg>
  );
}

"use client";

import { site } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-whatsapp fixed bottom-5 right-5 z-40 h-12 gap-2 px-4 shadow-lg sm:bottom-6 sm:right-6"
      aria-label="WhatsApp us"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.3c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6.1-1.6-.8-2.7-1.5-3.7-3.3-.2-.4.2-.4.6-1.1.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.7 2.7 4.2 3.7.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.2-.2-.5-.3z" />
        <path d="M12.1 2C6.6 2 2.1 6.5 2.1 12c0 1.8.5 3.4 1.3 4.9L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.6 2 12.1 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5 0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.7 8.4-8.3 8.4z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

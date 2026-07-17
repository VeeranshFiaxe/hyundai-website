"use client";

import { WhatsApp } from "./icons";

const WHATSAPP_URL =
  "https://wa.me/919892929363?text=Hi%2C%20I%20have%20a%20query%20regarding%20the%20Hyundai%20Website";

export default function WhatsAppWidget() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 md:bottom-8 md:right-8"
    >
      <WhatsApp className="h-7 w-7" />
      <span className="absolute -left-44 bottom-1/2 hidden translate-y-1/2 whitespace-nowrap rounded-md bg-white px-3 py-2 text-xs font-semibold text-text shadow-lg group-hover:block md:-left-52">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}

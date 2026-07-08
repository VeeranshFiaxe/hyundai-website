"use client";

import { useState } from "react";
import { faqData as defaultFaqData } from "@/lib/data";
import { ChevronDown } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function FAQ({
  id = "faq",
  data = defaultFaqData,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about purchasing and servicing your Hyundai.",
}: {
  id?: string;
  data?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id={id} className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[800px]">
        <SectionHeading title={title} subtitle={subtitle} align="center" />

        <div className="mt-12 space-y-4">
          {data.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 80} variant="fade-up">
                <div
                  className={`overflow-hidden rounded-lg border transition-colors ${
                    isOpen ? "border-brand bg-white shadow-sm" : "border-border bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-bg-2"
                  >
                    <span className="font-semibold text-text">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";
import { ArrowRight, Check, iconMap, type IconName } from "./icons";
import { serviceOfferings } from "@/lib/data";

/* Renders the detailed service-offering sections for the
   /locate-service-centre page. Each offering maps to a footer Service
   link and gets its own anchor (matching the footer hrefs) so the links
   land on real, indexable content rather than a bare booking form.

   Layout alternates light and off-white surfaces for rhythm, keeps the
   eyebrow + navy accent styling used elsewhere, and uses semantic
   h2/h3 headings so the copy is crawlable and extractable by answer
   engines. */
export default function ServiceContent() {
  return (
    <>
      {serviceOfferings.map((offering, i) => {
        const Icon = iconMap[offering.icon as IconName] ?? iconMap.shield;
        const reversed = i % 2 === 1;
        const onDark = i % 2 === 1;
        return (
          <section
            key={offering.id}
            id={offering.id}
            className={`scroll-mt-24 py-14 lg:py-20 ${onDark ? "bg-bg-2" : "bg-white"}`}
          >
            <div className="container-px mx-auto max-w-[1400px]">
              <div
                className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Copy */}
                <Reveal variant="slide-right">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="eyebrow">{offering.title}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl">
                    {offering.heading}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {offering.intro}
                  </p>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                    {offering.body.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                  <a
                    href="#book-service"
                    className="group mt-7 inline-flex items-center gap-2 rounded-full border border-brand px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    Book a Service
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Reveal>

                {/* Benefit points */}
                <Reveal delay={120} variant="slide-left">
                  <ul className="grid gap-3">
                    {offering.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-lg border border-border bg-white p-5 text-sm leading-relaxed text-text"
                      >
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

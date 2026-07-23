import Link from "next/link";
import Logo from "./Logo";
import BookTestDriveBtn from "./BookTestDriveBtn";
import { popularCars, nav, company } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  XLogo,
  LinkedIn,
  YouTube,
} from "./icons";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Cars", href: "/cars" },
  { label: "Hyundai Promise", href: "/hyundai-promise" },
  { label: "Service", href: "/locate-service-centre" },
  { label: "Locate Us", href: "/locate-us" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const serviceLinks = [
  { label: "Book a Service", href: "/locate-service-centre#book-service" },
  { label: "Service Packages", href: "/locate-service-centre#service-packages" },
  { label: "Genuine Parts", href: "/locate-service-centre#genuine-parts" },
  { label: "Roadside Assistance", href: "/locate-service-centre#roadside-assistance" },
  { label: "Extended Warranty", href: "/locate-service-centre#extended-warranty" },
];

const socials = [
  { Icon: Facebook, label: "Facebook", href: company.social.facebook },
  { Icon: Instagram, label: "Instagram", href: company.social.instagram },
  { Icon: XLogo, label: "X", href: company.social.x },
  { Icon: YouTube, label: "YouTube", href: company.social.youtube },
  { Icon: LinkedIn, label: "LinkedIn", href: company.social.linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep">
      {/* Main footer grid */}
      <div className="container-px mx-auto max-w-[1400px] pb-10 pt-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 pb-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Modi Hyundai is an authorised Hyundai dealership offering new car
              sales, servicing and genuine Hyundai parts across Mumbai, Thane,
              Vasai, Virar and Wada.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Modi Hyundai on ${label}`}
                  className="grid h-9 w-9 place-items-center rounded border border-white/15 text-white/60 transition-all hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <BookTestDriveBtn className="text-sm text-white/60 transition-colors hover:text-white">
                  Book a Test Drive
                </BookTestDriveBtn>
              </li>
            </ul>
          </div>

          {/* Popular cars */}
          <div>
            <h4 className="text-sm font-semibold text-white">Popular Cars</h4>
            <ul className="mt-4 space-y-3">
              {popularCars.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/cars/${c.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    Hyundai {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Service</h4>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  Modi Hyundai, New Link Road, Malad West, Mumbai, Maharashtra
                  400064
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a
                  href={`tel:${nav.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {nav.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Modi Hyundai. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container-px mx-auto max-w-[1400px] py-4 text-center text-[11px] text-white/35 sm:text-left">
          <p>
            The information, prices and offers on this website are for general
            guidance only and do not constitute an offer. Images shown may differ
            from actual products. Please contact Modi Hyundai for the latest
            prices, variant availability and offer terms.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { company, SITE_URL } from "@/lib/data";
import BackButton from "@/components/BackButton";

const title = "Privacy Policy | Modi Hyundai";
const description =
  "Learn how Modi Hyundai collects, uses and protects your personal information when you visit our website, book a test drive or schedule a service appointment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/privacy`,
    siteName: "Modi Hyundai",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const lastUpdated = "21 July 2026";

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${SITE_URL}/privacy#webpage`,
                url: `${SITE_URL}/privacy`,
                name: title,
                description,
                isPartOf: { "@id": `${SITE_URL}/#website` },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                  { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
                ],
              },
            ],
          }),
        }}
      />
      <main style={{ marginTop: "96px" }}>
        <section className="bg-brand-deep py-16 text-white">
          <div className="container-px mx-auto max-w-[900px]">
            <BackButton />
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
            <p className="mt-3 text-white/70">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="bg-white py-12 lg:py-16">
          <div className="container-px mx-auto max-w-[900px] space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_li]:pl-1 [&_strong]:text-text [&_address]:mt-4 [&_address]:rounded-lg [&_address]:border [&_address]:border-border [&_address]:bg-bg-2 [&_address]:p-5 [&_address]:text-sm [&_address]:not-italic [&_address]:space-y-1">
            <h2>1. Introduction</h2>
            <p>
              {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose and
              safeguard your personal information when you visit our website{" "}
              {SITE_URL} (the &ldquo;Website&rdquo;) or use any of our services including test-drive bookings,
              service appointments, vehicle enquiries and Hyundai Promise (pre-owned car) submissions
              (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p>
              By using the Website or our Services, you consent to the collection and use of your
              personal information as described in this Privacy Policy. If you do not agree with this
              policy, please do not use the Website or our Services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of personal information:</p>

            <h3>2.1 Information You Provide Directly</h3>
            <ul>
              <li><strong>Contact information:</strong> Your full name, mobile phone number and email address.</li>
              <li><strong>Location information:</strong> Your city, preferred dealership location and pincode.</li>
              <li><strong>Vehicle preferences:</strong> The car model, variant, budget range, fuel type and other preferences you share when enquiring.</li>
              <li><strong>Vehicle details:</strong> When using the Hyundai Promise sell form: car brand, model, year of purchase and kilometers driven.</li>
              <li><strong>Service details:</strong> Your car model, vehicle registration number, preferred service centre, type of service and preferred appointment date and time.</li>
              <li><strong>Communication content:</strong> Any messages, queries or feedback you submit through our contact forms.</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <p>
              When you visit the Website, we may automatically collect certain information about your
              device and browsing activity, including:
            </p>
            <ul>
              <li><strong>Log data:</strong> Your IP address, browser type, operating system, referring/exit pages, date and time stamps and clickstream data.</li>
              <li><strong>Device information:</strong> Device type, screen resolution and language settings.</li>
              <li><strong>Usage data:</strong> Pages visited, time spent on pages and interactions with Website elements.</li>
            </ul>
            <p>
              This information is collected through standard web-server logs and may use cookies or
              similar technologies (see Section 6 below).
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the personal information we collect for the following purposes:</p>
            <ul>
              <li>To process and respond to your test-drive bookings, service appointments, vehicle enquiries and Hyundai Promise submissions.</li>
              <li>To contact you via phone call, SMS or WhatsApp to confirm bookings, provide quotations, share vehicle information or follow up on your enquiry.</li>
              <li>To send you service reminders, maintenance tips and promotional offers related to Hyundai products and services (only where you have provided consent).</li>
              <li>To improve the Website, our Services and your overall experience with {company.name}.</li>
              <li>To comply with applicable legal obligations, resolve disputes and enforce our Terms and Conditions.</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p>
              We do not sell, trade or rent your personal information to third parties. We may share
              your information only in the following circumstances:
            </p>
            <ul>
              <li><strong>With Hyundai Motor India Limited:</strong> To facilitate test-drive coordination, warranty registration, service history records and related dealership operations.</li>
              <li><strong>With service providers:</strong> We may engage trusted third-party service providers to assist with website hosting, data storage, SMS/email communication and lead management. These providers are contractually bound to protect your data and use it only for the specific services they provide to us.</li>
              <li><strong>Legal compliance:</strong> We may disclose your information if required by law, court order or governmental authority, or to protect the rights, property or safety of {company.name}, our customers or the public.</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information only for as long as is necessary to fulfil the purposes
              described in this policy, or as required by applicable law. Enquiry and booking data is
              typically retained for a period of two (2) years from your last interaction with us, after
              which it is securely deleted or anonymised.
            </p>

            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              The Website may use cookies — small text files placed on your device — to enhance your
              browsing experience. Cookies help us:
            </p>
            <ul>
              <li>Remember your preferences and settings between visits.</li>
              <li>Understand how you use the Website so we can improve it.</li>
              <li>Provide a more personalised experience.</li>
            </ul>
            <p>
              You can control or disable cookies through your browser settings. However, please note
              that disabling cookies may affect the functionality of certain parts of the Website.
            </p>

            <h2>7. Data Security</h2>
            <p>
              We implement reasonable technical and organisational security measures to protect your
              personal information against unauthorised access, alteration, disclosure or destruction.
              These measures include encrypted data transmission (HTTPS), access controls, secure
              server infrastructure and regular security reviews. However, no method of transmission
              over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>8. Your Rights</h2>
            <p>Under applicable Indian data-protection laws, you have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> You may request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You may request that we correct any inaccurate or incomplete information.</li>
              <li><strong>Withdrawal of consent:</strong> You may withdraw your consent to our processing of your personal information at any time. This will not affect the lawfulness of processing carried out before your withdrawal.</li>
              <li><strong>Opt-out of marketing:</strong> You may opt out of receiving promotional communications from us by contacting us using the details below or by following the unsubscribe instructions in any marketing communication.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details in Section 10 below.
            </p>

            <h2>9. DNC / NDNC Consent</h2>
            <p>
              By providing your phone number through any form on the Website, you explicitly consent to
              being contacted by {company.name} via phone call, SMS or WhatsApp regarding your enquiry,
              even if your number is registered on the National Do Not Call (NDNC) Registry or any
              similar do-not-contact list. This consent overrides any prior DNC/NDNC registration you
              may have made for the specific purpose of your enquiry and the Services offered by{" "}
              {company.name}. You may withdraw this consent at any time by contacting us.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, concerns or requests regarding this Privacy Policy or your
              personal information, please contact us at:
            </p>
            <address className="not-italic">
              <strong>{company.name}</strong>
              <br />
              {company.primaryAddress.street}, {company.primaryAddress.locality},{" "}
              {company.primaryAddress.region} {company.primaryAddress.postalCode}
              <br />
              Phone:{" "}
              <a href={`tel:${company.phoneE164}`} className="text-brand underline hover:text-brand-light">
                {company.phone}
              </a>
              <br />
              Email:{" "}
              <a href={`mailto:${company.email}`} className="text-brand underline hover:text-brand-light">
                {company.email}
              </a>
            </address>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update this Privacy Policy at any time. Changes will be posted on
              this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this
              Privacy Policy periodically to stay informed about how we are protecting your information.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

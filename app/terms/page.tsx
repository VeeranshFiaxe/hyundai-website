import type { Metadata } from "next";
import { company, SITE_URL } from "@/lib/data";
import BackButton from "@/components/BackButton";

const title = "Terms & Conditions | Modi Hyundai";
const description =
  "Read the Terms and Conditions for using the Modi Hyundai website, booking test drives, and availing services at our dealerships across Mumbai.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/terms`,
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

export default function TermsPage() {
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
                "@id": `${SITE_URL}/terms#webpage`,
                url: `${SITE_URL}/terms`,
                name: title,
                description,
                isPartOf: { "@id": `${SITE_URL}/#website` },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                  { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: `${SITE_URL}/terms` },
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
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Terms &amp; Conditions</h1>
            <p className="mt-3 text-white/70">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="bg-white py-12 lg:py-16">
          <div className="container-px mx-auto max-w-[900px] space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_li]:pl-1 [&_strong]:text-text [&_address]:mt-4 [&_address]:rounded-lg [&_address]:border [&_address]:border-border [&_address]:bg-bg-2 [&_address]:p-5 [&_address]:text-sm [&_address]:not-italic [&_address]:space-y-1">
            <h2>1. Introduction</h2>
            <p>
              Welcome to the website of {company.name} (&ldquo;{company.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of our website located at{" "}
              {SITE_URL} (the &ldquo;Website&rdquo;) and any services, test-drive bookings, service appointments,
              quotations or enquiries made through it. By accessing or using this Website, you agree to be bound by
              these Terms. If you do not agree, please do not use the Website.
            </p>

            <h2>2. Definitions</h2>
            <p>In these Terms, unless the context requires otherwise:</p>
            <ul>
              <li><strong>&ldquo;User&rdquo;, &ldquo;you&rdquo; or &ldquo;your&rdquo;</strong> means any person who accesses or uses the Website.</li>
              <li><strong>&ldquo;Services&rdquo;</strong> means the services offered through the Website, including but not limited to test-drive booking, service-appointment scheduling, vehicle quotations and general enquiries.</li>
              <li><strong>&ldquo;Content&rdquo;</strong> means all text, images, graphics, pricing information, specifications, logos and other material published on the Website.</li>
            </ul>

            <h2>3. Use of the Website</h2>
            <p>You agree to use the Website only for lawful purposes and in accordance with these Terms. You shall not:</p>
            <ul>
              <li>Use the Website in any way that breaches any applicable local, national or international law or regulation.</li>
              <li>Transmit or upload any material that contains viruses, malware, trojan horses, worms or any other harmful code.</li>
              <li>Attempt to gain unauthorised access to the Website, the server on which it is stored or any server, computer or database connected to it.</li>
              <li>Use any automated means (including bots, scrapers or spiders) to access, copy or monitor the Website or its Content without our prior written consent.</li>
            </ul>

            <h2>4. Website Content and Accuracy</h2>
            <p>
              While we make every effort to ensure that the Content on the Website is accurate and up to date,
              {company.name} does not warrant that the Content is complete, accurate or current at all times.
              Vehicle prices, specifications, features, colours, availability, offers, finance options and
              accessories shown on the Website:
            </p>
            <ul>
              <li>Are sourced from Hyundai Motor India Limited and other third parties and may vary from actual products.</li>
              <li>May change without prior notice.</li>
              <li>Do not constitute an offer or a binding quotation.</li>
              <li>Are for general guidance only. Please contact {company.name} directly for the latest prices, variant availability and offer terms applicable at the time of your purchase or service booking.</li>
            </ul>
            <p>
              Images and videos of vehicles shown on the Website are for illustrative purposes only. Actual
              colour, trim, upholstery and equipment may differ. Accessories shown may not be part of the
              standard equipment.
            </p>

            <h2>5. Test Drive Bookings</h2>
            <p>
              When you book a test drive through the Website, you agree that:
            </p>
            <ul>
              <li>The booking is a request and is subject to availability of the vehicle, dealership staff and a suitable time slot.</li>
              <li>{company.name} or its authorised representatives will contact you using the phone number or email you provided to confirm the booking.</li>
              <li>You must hold a valid driving licence and present it at the time of the test drive.</li>
              <li>{company.name} reserves the right to refuse or cancel a test drive at its sole discretion, including where the requested vehicle is unavailable or where road or weather conditions are deemed unsafe.</li>
              <li>You agree to drive the vehicle responsibly during the test drive, comply with all traffic laws, and follow the instructions of the accompanying {company.name} representative.</li>
            </ul>

            <h2>6. Service Appointments</h2>
            <p>When you book a service appointment through the Website:</p>
            <ul>
              <li>The booking is a request and is subject to service-centre capacity, parts availability and a mutually agreeable time slot.</li>
              <li>{company.name} will contact you to confirm the appointment and provide an estimated cost where possible.</li>
              <li>Service costs communicated through the Website or over the phone are estimates only. The final invoice may vary based on parts needed, labour hours and any additional work authorised by you during the service.</li>
              <li>You are responsible for removing all personal belongings from the vehicle before handing it over for service. {company.name} is not liable for loss of or damage to personal items left in the vehicle.</li>
            </ul>

            <h2>7. Hyundai Promise &mdash; Pre-Owned Cars</h2>
            <p>
              The Hyundai Promise section of the Website allows you to enquire about buying or selling
              pre-owned vehicles. When you submit a buy or sell enquiry:
            </p>
            <ul>
              <li>The enquiry is an expression of interest only and does not create a binding contract.</li>
              <li>For buy enquiries: {company.name} will provide information about available pre-owned inventory. Vehicle availability, condition, pricing and warranty coverage are subject to the specific vehicle and will be confirmed in writing before any transaction.</li>
              <li>For sell enquiries: {company.name} will contact you to discuss your vehicle and may request an in-person inspection before providing a valuation. Any valuation provided is indicative and non-binding.</li>
            </ul>

            <h2>8. Intellectual Property</h2>
            <p>
              All Content on the Website — including text, graphics, logos, icons, images, audio clips,
              digital downloads, data compilations and software — is the property of {company.name}, its
              affiliates or its content suppliers and is protected by Indian and international copyright,
              trademark and other intellectual property laws. The Hyundai name, logo and vehicle names are
              trademarks of Hyundai Motor Company and/or Hyundai Motor India Limited and are used under
              licence or fair-use principles by the authorised dealer network.
            </p>
            <p>
              You may view and print pages from the Website for your personal, non-commercial use only.
              You may not reproduce, distribute, modify, create derivative works from, publicly display or
              otherwise exploit any Content without our prior written consent.
            </p>

            <h2>9. Privacy and Personal Data</h2>
            <p>
              Your use of the Website and submission of any personal information (including your name,
              phone number, email address and vehicle preferences) is governed by our{" "}
              <a href="/privacy" className="text-brand underline hover:text-brand-light">Privacy Policy</a>, which forms
              part of these Terms. By using the Website and submitting your information, you consent to the
              collection, use and processing of your personal data as described in our Privacy Policy.
            </p>
            <p>
              <strong>DNC / NDNC Consent:</strong> By providing your phone number through any form on the
              Website, you explicitly consent to being contacted by {company.name} via phone call, SMS or
              WhatsApp regarding your enquiry, even if your number is registered on the National Do Not
              Call (NDNC) Registry or any similar do-not-contact list. This consent overrides any prior
              DNC/NDNC registration you may have made for the specific purpose of your enquiry and the
              services offered by {company.name}.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law:</p>
            <ul>
              <li>{company.name} shall not be liable for any direct, indirect, incidental, special, consequential or punitive damages arising out of or in connection with your use of, or inability to use, the Website or the Services.</li>
              <li>{company.name} does not guarantee that the Website will be available at all times, uninterrupted, secure or error-free, or that defects will be corrected.</li>
              <li>{company.name} is not responsible for the content, accuracy or opinions expressed on any third-party websites linked to or from the Website.</li>
            </ul>

            <h2>11. Indemnity</h2>
            <p>
              You agree to indemnify and hold harmless {company.name}, its directors, officers, employees,
              agents and affiliates from and against any claims, damages, losses, liabilities, costs and
              expenses (including reasonable legal fees) arising out of or related to your breach of these
              Terms or your use of the Website.
            </p>

            <h2>12. Third-Party Links</h2>
            <p>
              The Website may contain links to third-party websites. These links are provided for your
              convenience only. {company.name} does not endorse or assume responsibility for the content,
              privacy policies or practices of any third-party websites. You access them at your own risk.
            </p>

            <h2>13. Modifications to Terms</h2>
            <p>
              {company.name} reserves the right to modify these Terms at any time without prior notice.
              Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Your
              continued use of the Website after any such changes constitutes your acceptance of the
              revised Terms. We encourage you to review this page periodically.
            </p>

            <h2>14. Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of India. Any dispute
              arising out of or in connection with these Terms shall be subject to the exclusive
              jurisdiction of the courts in Mumbai, Maharashtra.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
          </div>
        </section>
      </main>
    </>
  );
}

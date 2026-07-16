import type { Metadata } from "next";
import { blogs, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";
import BlogsExplorer from "@/components/BlogsExplorer";

const title = "Hyundai Car Blog | Tips, Model Guides & Ownership Advice | Modi Hyundai";
const description =
  "Read the Modi Hyundai blog for Hyundai model buying guides, car-care and service tips, finance advice and electric-vehicle ownership stories for drivers across Mumbai.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Hyundai blog India",
    "Hyundai car buying guide",
    "Hyundai service tips",
    "Hyundai Creta N Line",
    "Hyundai Exter",
    "Hyundai IONIQ 5 electric",
    "car loan vs lease India",
  ],
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/blogs`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const blogsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blogs#blog`,
      url: `${SITE_URL}/blogs`,
      name: "Modi Hyundai Blog",
      description,
      publisher: { "@id": DEALER_ID },
      blogPost: blogs.map((post) => ({
        "@type": "BlogPosting",
        url: `${SITE_URL}/blogs/${post.slug}`,
        name: post.title,
        headline: post.title,
        image: post.image,
        description: post.excerpt,
        datePublished: new Date(post.date).toISOString(),
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
      ],
    },
    {
      "@type": "ItemList",
      itemListElement: blogs.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blogs/${post.slug}`,
        name: post.title,
      })),
    },
  ],
};

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsPageSchema).replace(/</g, "\\u003c") }}
      />
      <main style={{ marginTop: "60px" }}>
        <BlogsExplorer />
      </main>
    </>
  );
}

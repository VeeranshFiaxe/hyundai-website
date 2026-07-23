"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}

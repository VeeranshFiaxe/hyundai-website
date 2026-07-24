"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/utils/captureUtm";

// Captures utm_*/gclid/fbclid from the landing URL into sessionStorage,
// once per page load, before any form can be submitted. Renders nothing.
export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}

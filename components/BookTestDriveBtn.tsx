"use client";

import { useTestDrive } from "./TestDriveProvider";

export default function BookTestDriveBtn({
  carSlug,
  className,
  children,
}: {
  carSlug?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { openTestDrive } = useTestDrive();
  return (
    <button type="button" onClick={() => openTestDrive(carSlug)} className={className}>
      {children || "Book a Test Drive"}
    </button>
  );
}

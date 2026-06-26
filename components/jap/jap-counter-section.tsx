"use client";

import { useSearchParams } from "next/navigation";
import { JapCounter } from "./jap-counter";
import { mantras, getMantraBySlug } from "@/lib/data/mantras";

/**
 * Reads the `?mantra=` query param on the client so the page can be statically
 * exported (server-side searchParams would force dynamic rendering).
 */
export function JapCounterSection() {
  const slug = useSearchParams().get("mantra");
  const mantra = slug ? getMantraBySlug(slug) : mantras[0];
  return <JapCounter mantraName={mantra?.name ?? "Om Namah Shivaya"} />;
}

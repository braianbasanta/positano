"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

// Dispara la captura first-touch de atribución (utm_*, gclid, referrer) en el
// primer aterrizaje de la sesión. Se re-evalúa en cada navegación de cliente,
// pero captureAttribution() es idempotente (no sobreescribe lo ya guardado).
export default function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution();
  }, [pathname, searchParams]);

  return null;
}

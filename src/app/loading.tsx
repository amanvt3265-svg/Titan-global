import Image from "next/image";
import { company } from "@/config/company";

/**
 * Global page loader — shown only while Next.js loads the current route.
 * Uses native App Router loading.tsx: appears on navigation, disappears
 * the instant the page content is ready. No timeouts, no fake delays.
 */
export default function Loading() {
  return (
    <div className="loader-overlay" role="status" aria-label="Loading">
      <div className="loader-content">
        {/* Logo */}
        <div className="loader-logo">
          <Image
            src={company.logo}
            alt=""
            width={355}
            height={130}
            priority
            className="h-14 w-auto object-contain sm:h-16 lg:h-[4.25rem]"
          />
        </div>

        {/* Gold spinner */}
        <div className="loader-spinner" />

        {/* Company name */}
        <p className="loader-text">{company.companyName}</p>
      </div>
    </div>
  );
}

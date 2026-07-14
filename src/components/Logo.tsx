import Image from "next/image";
import { company } from "@/config/company";

// Brand lockup: the official logo artwork (public/logo-new.png), rendered
// at its native aspect ratio. Do not distort — height is set responsively
// via className and width scales automatically (w-auto).
export function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={company.logo}
      alt={`${company.companyName} logo`}
      width={355}
      height={130}
      priority={priority}
      className={`h-14 w-auto object-contain sm:h-16 lg:h-[4.25rem] ${className}`}
    />
  );
}

import { Reveal } from "./motion/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

// Consistent eyebrow + title + description block used across sections.
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal
      className={`max-w-2xl ${alignment} ${className}`}
      direction={align === "center" ? "up" : "right"}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`heading-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/60" : "text-ink/60"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

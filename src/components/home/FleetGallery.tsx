import Image from "next/image";
import { fleetGallery, homeSections } from "@/config/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

export function FleetGallery() {
  const s = homeSections.fleet;
  return (
    <section className="bg-mist py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.description} />

        <Stagger className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4">
          {fleetGallery.map((item, i) => (
            <RevealItem key={i} className={`group relative overflow-hidden rounded-2xl ${item.span}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 h-1 w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

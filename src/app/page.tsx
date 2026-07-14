import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Stats } from "@/components/home/Stats";
import { ContainerTypes } from "@/components/home/ContainerTypes";
import { Process } from "@/components/home/Process";
import { IndustriesStrip } from "@/components/home/IndustriesStrip";
import { Coverage } from "@/components/home/Coverage";
import { Safety } from "@/components/home/Safety";
import { Testimonials } from "@/components/home/Testimonials";
import { FleetGallery } from "@/components/home/FleetGallery";
import { Faqs } from "@/components/home/Faqs";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { faqs } from "@/config/content";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <Partners />
      <WhyChoose />
      <ServicesPreview />
      <Stats />
      <ContainerTypes />
      <Process />
      <IndustriesStrip />
      <Coverage />
      <Safety />
      <Testimonials />
      <FleetGallery />
      <Faqs />
      <CtaSection />
    </>
  );
}

import { Contact } from "../components/Contact";
import { Hero } from "../components/Hero";
import { Legacy } from "../components/Legacy";
import { MotionDirector } from "../components/MotionDirector.client";
import { Positioning } from "../components/Positioning";
import { Projects } from "../components/Projects";
import { Services } from "../components/Services";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Aluminica",
    description: "Herrería y carpintería de aluminio para obras, profesionales y hogares.",
    areaServed: ["Córdoba", "Gran Córdoba"],
    sameAs: ["https://www.instagram.com/_aluminica/"],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <Positioning />
      <Projects />
      <Services />
      <Legacy />
      <Contact />
      <MotionDirector />
    </main>
  );
}

import { Contact } from "../components/Contact";
import { Hero } from "../components/Hero";
import { ImmersiveWork } from "../components/ImmersiveWork";
import { Legacy } from "../components/Legacy";
import { Positioning } from "../components/Positioning";
import { Projects } from "../components/Projects";
import { Services } from "../components/Services";
import { JsonLd } from "../components/JsonLd";
import { localBusinessSchema } from "../lib/seo";

export default function Home() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <Positioning />
      <Projects />
      <ImmersiveWork />
      <Services />
      <Legacy />
      <Contact />
    </main>
  );
}

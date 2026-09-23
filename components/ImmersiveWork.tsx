import Image from "next/image";
import { IconArrowDown } from "./Icons";

const chapters = [
  {
    number: "00",
    kicker: "Nuestro proceso",
    title: "Cada proyecto empieza por una necesidad.",
    body: "Escuchamos qué necesitás, vemos el espacio y definimos una solución posible, funcional y hecha a medida.",
  },
  {
    number: "01",
    kicker: "Relevamiento",
    title: "Entendemos el proyecto.",
    body: "Revisamos usos, medidas, condiciones de obra y terminaciones antes de comenzar a fabricar.",
  },
  {
    number: "02",
    kicker: "Taller",
    title: "Fabricamos cada pieza.",
    body: "Trabajamos aluminio y hierro con experiencia de oficio, precisión y atención en los detalles que hacen que todo funcione.",
  },
  {
    number: "03",
    kicker: "Instalación",
    title: "Lo llevamos a obra.",
    body: "Coordinamos el montaje y dejamos la solución instalada, lista para usar y pensada para durar.",
  },
];

export function ImmersiveWork() {
  return (
    <section className="immersive" aria-labelledby="immersive-title">
      <div className="immersive__track" data-immersive-track>
        <div className="immersive__viewport">
          <div className="immersive__topline" aria-hidden="true">
            <span>Por qué elegirnos / Diseño, fabricación e instalación</span>
            <span><b data-immersive-counter>01</b> / 04</span>
          </div>

          <div className="immersive__scene" data-immersive-scene aria-hidden="true">
            <div className="immersive__base" data-immersive-base>
              <Image src="/media/projects/pergolas-y-galerias/pergolas-y-galerias-03.webp" alt="" fill sizes="100vw" />
            </div>
            <div className="immersive__wash" />
            <div className="immersive__grid" />

            <div className="immersive__plane immersive__plane--facade" data-immersive-plane="facade">
              <Image src="/media/projects/revestimientos-wpc/revestimientos-wpc-01.webp" alt="" fill sizes="52vw" />
              <span>01 / Revestimiento WPC</span>
            </div>
            <div className="immersive__plane immersive__plane--opening" data-immersive-plane="opening">
              <Image src="/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-03.webp" alt="" fill sizes="56vw" />
              <span>02 / Aberturas</span>
            </div>
            <div className="immersive__plane immersive__plane--structure" data-immersive-plane="structure">
              <Image src="/media/projects/pergolas-y-galerias/pergolas-y-galerias-01.webp" alt="" fill sizes="64vw" />
              <span>03 / Pérgola</span>
            </div>
          </div>

          <div className="immersive__chapters">
            {chapters.map((chapter, index) => (
              <article className={`immersive__chapter${index === 0 ? " is-active" : ""}`} data-immersive-chapter key={chapter.number}>
                <p>{chapter.number} / {chapter.kicker}</p>
                <h2 id={index === 0 ? "immersive-title" : undefined}>{chapter.title}</h2>
                <span>{chapter.body}</span>
              </article>
            ))}
          </div>

          <div className="immersive__progress" aria-hidden="true"><i data-immersive-progress /></div>
          <p className="immersive__hint" aria-hidden="true">Deslizá para recorrer <IconArrowDown size={14} /></p>
        </div>
      </div>
    </section>
  );
}

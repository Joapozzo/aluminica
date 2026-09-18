import Image from "next/image";

const chapters = [
  {
    number: "00",
    kicker: "Vista general",
    title: "Explorá una transformación completa.",
    body: "Descubrí cómo el aluminio, el vidrio y la herrería pueden sumar luz, apertura, protección y nuevos usos.",
  },
  {
    number: "01",
    kicker: "Fachada",
    title: "Más luz. Mejor aprovechada.",
    body: "Perfiles y paños de vidrio distribuidos para iluminar, proteger y ordenar visualmente el frente.",
  },
  {
    number: "02",
    kicker: "Apertura",
    title: "Abrir cambia todo.",
    body: "Grandes aberturas conectan interior y exterior, amplían el paso y mejoran la forma de usar cada ambiente.",
  },
  {
    number: "03",
    kicker: "Estructura",
    title: "Más sombra. Más espacio útil.",
    body: "Pérgolas y estructuras a medida permiten aprovechar patios, galerías y áreas de trabajo durante más tiempo.",
  },
];

export function ImmersiveWork() {
  return (
    <section className="immersive" aria-labelledby="immersive-title">
      <div className="immersive__track" data-immersive-track>
        <div className="immersive__viewport">
          <div className="immersive__topline" aria-hidden="true">
            <span>Recorrido interactivo / Referencia conceptual</span>
            <span><b data-immersive-counter>01</b> / 04</span>
          </div>

          <div className="immersive__scene" data-immersive-scene aria-hidden="true">
            <div className="immersive__base" data-immersive-base>
              <Image src="/stock/glass-house.webp" alt="" fill sizes="100vw" />
            </div>
            <div className="immersive__wash" />
            <div className="immersive__grid" />

            <div className="immersive__plane immersive__plane--facade" data-immersive-plane="facade">
              <Image src="/stock/facade-detail.webp" alt="" fill sizes="52vw" />
              <span>01 / Modulación</span>
            </div>
            <div className="immersive__plane immersive__plane--opening" data-immersive-plane="opening">
              <Image src="/stock/glass-doors.webp" alt="" fill sizes="56vw" />
              <span>02 / Apertura total</span>
            </div>
            <div className="immersive__plane immersive__plane--structure" data-immersive-plane="structure">
              <Image src="/stock/pergola-black.webp" alt="" fill sizes="64vw" />
              <span>03 / Estructura</span>
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
          <p className="immersive__hint" aria-hidden="true">Deslizá para recorrer <span>↓</span></p>
        </div>
      </div>
    </section>
  );
}

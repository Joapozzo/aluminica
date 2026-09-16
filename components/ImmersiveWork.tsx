import Image from "next/image";

const chapters = [
  {
    number: "00",
    kicker: "Vista general",
    title: "Entrá en la obra.",
    body: "Una lectura espacial para entender cómo aluminio, vidrio y estructura construyen una misma arquitectura.",
  },
  {
    number: "01",
    kicker: "Envolvente",
    title: "La precisión define el ritmo.",
    body: "Perfiles modulados para ordenar la fachada, sostener los paños y mantener continuidad en cada encuentro.",
  },
  {
    number: "02",
    kicker: "Apertura",
    title: "El límite también puede desaparecer.",
    body: "Grandes hojas plegables conectan interior y exterior sin resignar cierre, escala ni presencia.",
  },
  {
    number: "03",
    kicker: "Estructura",
    title: "Sombra diseñada como arquitectura.",
    body: "Vigas y perfiles trabajan como una pieza única: filtran la luz, ordenan el espacio y extienden su uso.",
  },
];

export function ImmersiveWork() {
  return (
    <section className="immersive" aria-labelledby="immersive-title">
      <div className="immersive__track" data-immersive-track>
        <div className="immersive__viewport">
          <div className="immersive__topline" aria-hidden="true">
            <span>Experiencia 2.5D / Obra conceptual</span>
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

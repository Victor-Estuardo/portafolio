import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  experiencia,
  formacion,
  habilidades,
  perfil,
  proyecto,
  textos,
} from "./content";

const secciones = [
  { id: "proyecto", nombre: "Proyecto", n: "01" },
  { id: "experiencia", nombre: "Experiencia", n: "02" },
  { id: "habilidades", nombre: "Habilidades", n: "03" },
  { id: "contacto", nombre: "Contacto", n: "04" },
];

function useSeccionActiva() {
  const [activa, setActiva] = useState("inicio");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => e.isIntersecting && setActiva(e.target.id));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ["inicio", ...secciones.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return activa;
}

/** Aparición suave una sola vez al entrar en pantalla. */
function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal${visible ? " visible" : ""}`}>
      {children}
    </div>
  );
}

function Seccion({
  id,
  n,
  titulo,
  subtitulo,
  children,
}: {
  id: string;
  n: string;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="scroll-mt-20 border-t border-linea py-16 md:py-20"
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <span
            aria-hidden="true"
            className="font-display text-xl italic text-terracota"
          >
            {n}
          </span>
          <h2
            id={`${id}-titulo`}
            className="text-3xl font-medium tracking-tight md:text-4xl"
          >
            {titulo}
          </h2>
          {subtitulo ? (
            <span className="text-sm text-suave">{subtitulo}</span>
          ) : null}
        </div>
        {children}
      </Reveal>
    </section>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-terracota">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function Video() {
  const { youtubeId, archivo, titulo } = proyecto.video;
  if (youtubeId) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-linea bg-superficie">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={titulo}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }
  if (archivo) {
    return (
      <video
        className="aspect-video w-full rounded-xl border border-linea bg-superficie"
        controls
        preload="metadata"
        aria-label={titulo}
      >
        <source src={archivo} type="video/mp4" />
      </video>
    );
  }
  return null;
}

const retraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function App() {
  const activa = useSeccionActiva();
  const hayVideo = Boolean(proyecto.video.youtubeId || proyecto.video.archivo);
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-terracota focus:px-4 focus:py-2 focus:text-white"
      >
        {textos.irAlContenido}
      </a>

      <header className="sticky top-0 z-20 bg-arena/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 sm:px-8">
          <a
            href="#inicio"
            className="font-display text-xl font-medium no-underline"
          >
            Victor López
          </a>
          <nav aria-label="Secciones">
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {secciones.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="nav-link"
                    aria-current={activa === s.id ? "true" : undefined}
                  >
                    {s.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido" className="mx-auto max-w-5xl px-6 sm:px-8">
        <section id="inicio" className="pb-20 pt-14 md:pb-24 md:pt-24">
          <p
            className="entrada mb-7 inline-flex items-center gap-3 rounded-full border border-linea bg-superficie px-4 py-1.5 text-sm font-medium text-suave"
            style={retraso(0)}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-terracota"
            />
            {perfil.rol} · Ciudad de Guatemala
          </p>
          <h1
            className="entrada max-w-4xl text-[clamp(2.5rem,6vw,4.25rem)] font-normal leading-[1.06] tracking-tight"
            style={retraso(100)}
          >
            {perfil.titular.antes}
            <em className="text-terracota">{perfil.titular.destacado}</em>
            {perfil.titular.despues}
          </h1>
          <p
            className="entrada mt-7 max-w-[60ch] text-lg text-suave"
            style={retraso(200)}
          >
            {perfil.intro}
          </p>
          <div
            className="entrada mt-9 flex flex-wrap gap-3"
            style={retraso(300)}
          >
            <a href="#proyecto" className="btn btn-primario">
              Ver proyecto
            </a>
            <a href="#contacto" className="btn btn-borde">
              Contacto
            </a>
          </div>
        </section>

        <Seccion
          id="proyecto"
          n="01"
          titulo={proyecto.nombre}
          subtitulo="Proyecto de graduación · 2025 a 2026"
        >
          <p className="mb-8 max-w-[62ch]">{proyecto.descripcion}</p>
          {hayVideo ? (
            <div className="mb-8">
              <Video />
            </div>
          ) : null}
          <ul className="mb-12 flex flex-wrap gap-x-7 gap-y-2 font-semibold">
            <li>
              <a
                href={proyecto.sitio}
                target="_blank"
                rel="noreferrer"
                className="enlace"
              >
                {textos.verSitio}
              </a>
            </li>
            <li>
              <a
                href={proyecto.codigo}
                target="_blank"
                rel="noreferrer"
                className="enlace"
              >
                {textos.verCodigo}
              </a>
            </li>
          </ul>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {proyecto.bloques.map((b) => (
              <div key={b.titulo}>
                <h3 className="mb-3 text-xl font-medium">{b.titulo}</h3>
                {"texto" in b && b.texto ? <p>{b.texto}</p> : null}
                {"lista" in b && b.lista ? <Lista items={b.lista} /> : null}
              </div>
            ))}
          </div>
          <p className="mt-10 text-base text-suave">
            <span className="font-semibold text-tinta">{textos.stack}</span>
            {proyecto.stack}
          </p>
        </Seccion>

        <Seccion id="experiencia" n="02" titulo="Experiencia">
          <div className="gap-10 md:grid md:grid-cols-[13rem_1fr]">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold">{experiencia.empresa}</p>
              <p className="text-base text-suave">
                {experiencia.cargo}
                <br />
                {experiencia.fechas}
              </p>
            </div>
            <div>
              <Lista items={experiencia.puntos} />
              <p className="mt-5 text-base text-suave">
                <span className="font-semibold text-tinta">{textos.stack}</span>
                {experiencia.stack}
              </p>
            </div>
          </div>
          <div className="mt-12 gap-10 border-t border-linea pt-10 md:grid md:grid-cols-[13rem_1fr]">
            <p className="mb-2 font-semibold md:mb-0">Formación</p>
            <p>
              {formacion.titulo}, {formacion.institucion}. {formacion.fechas}.
            </p>
          </div>
        </Seccion>

        <Seccion id="habilidades" n="03" titulo="Habilidades">
          <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {habilidades.map((h) => (
              <div key={h.grupo}>
                <dt className="mb-1 text-sm font-semibold uppercase tracking-wide text-suave">
                  {h.grupo}
                </dt>
                <dd>{h.detalle}</dd>
              </div>
            ))}
          </dl>
        </Seccion>

        <Seccion id="contacto" n="04" titulo="Contacto">
          <p className="mb-6 max-w-[56ch]">{textos.contacto}</p>
          <a
            href={`mailto:${perfil.correo}`}
            className="enlace font-display text-3xl font-medium md:text-4xl"
          >
            {perfil.correo}
          </a>
          <ul className="mt-6 flex gap-7 font-semibold">
            <li>
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer"
                className="enlace"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={perfil.linkedin}
                target="_blank"
                rel="noreferrer"
                className="enlace"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </Seccion>

        <footer className="border-t border-linea py-10 text-sm text-suave">
          © 2026 {perfil.nombre}. {textos.pie}
        </footer>
      </main>
    </>
  );
}

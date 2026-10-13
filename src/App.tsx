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
    // La última sección es corta y no alcanza la banda del observer: al llegar al final se marca sola.
    const alFinal = () => {
      const fin =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (fin) setActiva(secciones[secciones.length - 1].id);
    };
    window.addEventListener("scroll", alFinal, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", alFinal);
    };
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
    // Sin observer, o si la sección ya quedó arriba (enlace directo a #seccion), se muestra de una vez.
    if (
      !("IntersectionObserver" in window) ||
      el.getBoundingClientRect().bottom < 0
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
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

function Externo({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only">{textos.nuevaPestana}</span>
    </a>
  );
}

function Filas({ items }: { items: { lead: string; texto: string }[] }) {
  return (
    <dl className="divide-y divide-linea border-y border-linea">
      {items.map((i) => (
        <div key={i.lead} className="py-4">
          <dt className="font-semibold">{i.lead}</dt>
          <dd className="mt-1 text-base text-suave">{i.texto}</dd>
        </div>
      ))}
    </dl>
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

type CapturaDatos = {
  src: string;
  alt: string;
  pie: string;
  ruta?: string;
  ancho: number;
  alto: number;
};

/** Captura enmarcada como ventana del sitio; abre la imagen completa en otra pestaña. */
function Captura({
  c,
  prioridad = false,
}: {
  c: CapturaDatos;
  prioridad?: boolean;
}) {
  return (
    <figure>
      <a
        href={c.src}
        target="_blank"
        rel="noreferrer"
        className="captura block overflow-hidden rounded-xl border border-linea bg-superficie no-underline"
      >
        {c.ruta !== undefined ? (
          <span className="block truncate border-b border-linea px-4 py-2 text-xs text-suave">
            adopciones.merakigt.org{c.ruta === "/" ? "" : c.ruta}
          </span>
        ) : null}
        <img
          src={c.src}
          alt={c.alt}
          width={c.ancho}
          height={c.alto}
          loading={prioridad ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
        />
        <span className="sr-only">
          {textos.verImagen}
          {textos.nuevaPestana}
        </span>
      </a>
      <figcaption className="mt-3 text-sm text-suave">{c.pie}</figcaption>
    </figure>
  );
}

const retraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function App() {
  const activa = useSeccionActiva();
  // Al abrir con #seccion, el navegador salta antes de que React pinte: se repite el salto ya montado.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  const hayVideo = Boolean(proyecto.video.youtubeId || proyecto.video.archivo);
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-terracota focus:px-4 focus:py-2 focus:text-white"
      >
        {textos.irAlContenido}
      </a>

      <header className="z-20 sm:sticky sm:top-0 bg-arena/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-3 sm:px-8">
          <a
            href="#inicio"
            className="font-display text-xl font-medium no-underline"
          >
            Victor López
          </a>
          <nav aria-label="Secciones">
            <ul className="flex gap-x-4 sm:gap-x-7">
              {secciones.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="nav-link"
                    aria-current={activa === s.id ? "location" : undefined}
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
            <span className="font-medium text-tinta">
              {perfil.rol} en {perfil.ciudad}.
            </span>{" "}
            {perfil.intro}
          </p>
          <div
            className="entrada mt-9 flex flex-wrap gap-3"
            style={retraso(300)}
          >
            <a href="#proyecto" className="btn btn-primario">
              {textos.verProyecto}
            </a>
            <a href={`mailto:${perfil.correo}`} className="btn btn-borde">
              {textos.escribeme}
            </a>
          </div>
        </section>

        <Seccion
          id="proyecto"
          n="01"
          titulo={proyecto.nombre}
          subtitulo={textos.subtituloProyecto}
        >
          <p className="max-w-[62ch]">{proyecto.descripcion}</p>
          <ul className="mb-10 mt-6 flex flex-wrap gap-3">
            <li>
              <Externo href={proyecto.sitio} className="btn btn-primario">
                {textos.verSitio}
              </Externo>
            </li>
            <li>
              <Externo href={proyecto.codigo} className="btn btn-borde">
                {textos.verCodigo}
              </Externo>
            </li>
          </ul>
          <div className="mb-14">
            <Captura c={proyecto.capturas.principal} prioridad />
          </div>
          {hayVideo ? (
            <div className="mb-14">
              <Video />
            </div>
          ) : null}
          <h3 className="mb-2 text-xl font-medium">{textos.problema}</h3>
          <p className="mb-12 max-w-[62ch]">{proyecto.problema}</p>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-medium">{textos.construi}</h3>
              <Filas items={proyecto.construi} />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-medium">{textos.decisiones}</h3>
              <Filas items={proyecto.decisiones} />
            </div>
          </div>
          <h3 className="mb-5 mt-14 text-xl font-medium">
            {textos.masPantallas}
          </h3>
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-[1fr_13rem]">
            <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {proyecto.capturas.galeria.map((c) => (
                <li key={c.src}>
                  <Captura c={c} />
                </li>
              ))}
            </ul>
            <div className="max-w-[15rem] md:max-w-none">
              <Captura c={proyecto.capturas.movil} />
            </div>
          </div>
          <h3 className="mb-4 mt-14 text-xl font-medium">{textos.proceso}</h3>
          <ul className="flex flex-wrap gap-2">
            {proyecto.proceso.map((p) => (
              <li
                key={p}
                className="rounded-full border border-linea bg-superficie px-4 py-1.5 text-base"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-base text-suave">
            <span className="font-semibold text-tinta">{textos.stack}</span>
            {proyecto.stack}
          </p>
        </Seccion>

        <Seccion id="experiencia" n="02" titulo="Experiencia">
          <div className="gap-10 md:grid md:grid-cols-[13rem_1fr]">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold">{experiencia.empresa}</p>
              <Externo
                href={experiencia.equipo.sitio}
                className="enlace text-base"
              >
                {experiencia.equipo.nombre}
              </Externo>
              <p className="mt-1 text-base text-suave">
                {experiencia.cargo}
                <br />
                {experiencia.fechas}
              </p>
            </div>
            <div>
              <p className="mb-6 max-w-[62ch]">{experiencia.contexto}</p>
              <Lista items={experiencia.puntos} />
              <p className="mt-5 text-base text-suave">
                <span className="font-semibold text-tinta">{textos.stack}</span>
                {experiencia.stack}
              </p>
            </div>
          </div>
          <h3 className="mb-2 mt-14 text-xl font-medium">
            {experiencia.capturas.titulo}
          </h3>
          <p className="mb-6 max-w-[62ch] text-base text-suave">
            {experiencia.capturas.nota}
          </p>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {experiencia.capturas.items.map((c) => (
              <li key={c.src}>
                <Captura c={c} />
              </li>
            ))}
          </ul>
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
          <ul className="mt-4 flex gap-7 font-semibold">
            <li>
              <Externo href={perfil.github} className="enlace inline-block py-2">
                GitHub
              </Externo>
            </li>
            <li>
              <Externo
                href={perfil.linkedin}
                className="enlace inline-block py-2"
              >
                LinkedIn
              </Externo>
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

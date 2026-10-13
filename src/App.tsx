import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  experiencia,
  extras,
  formacion,
  perfil,
  proyecto,
  textos,
} from "./content";

const secciones = [
  { id: "proyecto", nombre: "Proyecto", n: "01" },
  { id: "experiencia", nombre: "Experiencia", n: "02" },
  { id: "contacto", nombre: "Contacto", n: "03" },
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

// Las capturas de 1600 px tienen una versión de 800 px junto a ellas (nombre-800.webp).
const srcSetDe = (c: CapturaDatos) =>
  c.ancho === 1600
    ? `${c.src.replace(/\.webp$/, "-800.webp")} 800w, ${c.src} 1600w`
    : undefined;

const AbrirVisor = createContext<(c: CapturaDatos) => void>(() => {});

/** Captura enmarcada como ventana del sitio; al activarla se amplía en el visor. */
function Captura({
  c,
  prioridad = false,
  sizes = "(min-width: 1024px) 320px, (min-width: 640px) 480px, 100vw",
}: {
  c: CapturaDatos;
  prioridad?: boolean;
  sizes?: string;
}) {
  const abrir = useContext(AbrirVisor);
  return (
    <figure>
      <button
        type="button"
        onClick={() => abrir(c)}
        className="captura group relative block w-full overflow-hidden rounded-xl border border-linea bg-superficie text-left"
      >
        {c.ruta !== undefined ? (
          <span
            aria-hidden="true"
            className="block truncate border-b border-linea px-4 py-2 text-xs text-suave"
          >
            adopciones.merakigt.org{c.ruta === "/" ? "" : c.ruta}
          </span>
        ) : null}
        <img
          src={c.src}
          srcSet={srcSetDe(c)}
          sizes={srcSetDe(c) ? sizes : undefined}
          alt={c.alt}
          width={c.ancho}
          height={c.alto}
          loading={prioridad ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
        />
        <span className="captura-ampliar" aria-hidden="true">
          {textos.ampliar}
        </span>
        <span className="sr-only">. {textos.ampliar}</span>
      </button>
      <figcaption className="mt-3 text-sm text-suave">{c.pie}</figcaption>
    </figure>
  );
}

/** Visor a pantalla completa con <dialog>: Esc, clic fuera o "Cerrar" lo cierran. */
function Visor({
  c,
  onCerrar,
}: {
  c: CapturaDatos | null;
  onCerrar: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (c && !d.open) d.showModal();
    if (!c && d.open) d.close();
  }, [c]);
  return (
    <dialog
      ref={ref}
      className="visor"
      aria-label={c?.pie}
      onClose={onCerrar}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      {c ? (
        <figure className="flex max-h-full w-full flex-col sm:w-auto">
          <div className="visor-lienzo">
            <img
              src={c.src}
              alt={c.alt}
              width={c.ancho}
              height={c.alto}
              className={c.ancho > c.alto ? "visor-ancha" : "visor-alta"}
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 px-1 pt-3 text-sm text-white/80">
            <span>
              {c.pie}
              {c.ancho > c.alto ? (
                <span className="block text-white/60 sm:hidden">
                  {textos.desliza}
                </span>
              ) : null}
            </span>
            <button
              type="button"
              autoFocus
              onClick={() => ref.current?.close()}
              className="btn btn-claro"
            >
              {textos.cerrar}
            </button>
          </figcaption>
        </figure>
      ) : null}
    </dialog>
  );
}

function Galeria({
  items,
  visibles,
}: {
  items: CapturaDatos[];
  visibles: number;
}) {
  const resto = items.slice(visibles);
  return (
    <>
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, visibles).map((c) => (
          <li key={c.src}>
            <Captura c={c} />
          </li>
        ))}
      </ul>
      {resto.length ? (
        <details className="mas mt-8">
          <summary className="btn btn-borde">
            {textos.verMasPantallas} ({resto.length})
          </summary>
          <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((c) => (
              <li key={c.src}>
                <Captura c={c} />
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </>
  );
}

function CopiarCorreo() {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(perfil.correo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sin acceso al portapapeles el correo sigue visible para copiarlo a mano.
    }
  };
  return (
    <>
      <button type="button" onClick={copiar} className="btn btn-borde">
        {copiado ? textos.correoCopiado : textos.copiarCorreo}
      </button>
      <span className="sr-only" aria-live="polite">
        {copiado ? textos.correoCopiado : ""}
      </span>
    </>
  );
}

const retraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function App() {
  const activa = useSeccionActiva();
  const [enVisor, setEnVisor] = useState<CapturaDatos | null>(null);
  // Al abrir con #seccion, el navegador salta antes de que React pinte: se repite el salto ya montado.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  const hayVideo = Boolean(proyecto.video.youtubeId || proyecto.video.archivo);
  const { galeria, movil } = proyecto.capturas;
  return (
    <AbrirVisor.Provider value={setEnVisor}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-terracota focus:px-4 focus:py-2 focus:text-white"
      >
        {textos.irAlContenido}
      </a>

      <header className="sticky top-0 z-20 bg-arena/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-x-6 px-4 sm:px-8">
          <a
            href="#inicio"
            className="py-3 font-display text-lg font-medium no-underline sm:text-xl"
          >
            <span className="sm:hidden">Victor</span>
            <span className="hidden sm:inline">Victor López</span>
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
        <section id="inicio" className="pb-16 pt-12 md:pb-20 md:pt-20">
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
          <dl
            className="entrada mt-12 grid gap-y-4 border-t border-linea pt-6 text-base sm:grid-cols-3 sm:gap-x-8"
            style={retraso(400)}
          >
            {perfil.hechos.map((h) => (
              <div key={h.dt}>
                <dt className="text-sm text-suave">{h.dt}</dt>
                <dd className="mt-0.5 font-medium">{h.dd}</dd>
              </div>
            ))}
          </dl>
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
            <Captura
              c={proyecto.capturas.principal}
              prioridad
              sizes="(min-width: 1024px) 960px, 100vw"
            />
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
          <h3 className="mb-2 mt-12 text-xl font-medium">{textos.proceso}</h3>
          <p className="max-w-[62ch]">{proyecto.proceso}</p>
          <p className="mt-4 text-base text-suave">
            <span className="font-semibold text-tinta">{textos.stack}</span>
            {proyecto.stack}
          </p>
          <details className="mas mt-10">
            <summary className="btn btn-borde">
              {textos.verMasPantallas} ({galeria.length + 1})
            </summary>
            <div className="mt-8 grid gap-x-6 gap-y-8 md:grid-cols-[1fr_13rem]">
              <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                {galeria.map((c) => (
                  <li key={c.src}>
                    <Captura c={c} />
                  </li>
                ))}
              </ul>
              <div className="max-w-[15rem] md:max-w-none">
                <Captura c={movil} />
              </div>
            </div>
          </details>
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
              <Filas items={experiencia.puntos} />
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
          <Galeria
            items={experiencia.capturas.items}
            visibles={experiencia.capturas.visibles}
          />
          <dl className="mt-14 divide-y divide-linea border-y border-linea">
            {[
              {
                lead: "Formación",
                texto: `${formacion.titulo}, ${formacion.institucion}. ${formacion.fechas}.`,
              },
              ...extras,
            ].map((f) => (
              <div
                key={f.lead}
                className="gap-10 py-4 md:grid md:grid-cols-[13rem_1fr]"
              >
                <dt className="font-semibold">{f.lead}</dt>
                <dd className="mt-1 md:mt-0">{f.texto}</dd>
              </div>
            ))}
          </dl>
        </Seccion>

        <Seccion id="contacto" n="03" titulo="Contacto">
          <p className="mb-6 max-w-[56ch]">{textos.contacto}</p>
          <a
            href={`mailto:${perfil.correo}`}
            className="enlace break-all font-display text-3xl font-medium md:text-4xl"
          >
            {perfil.correo}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <CopiarCorreo />
            <Externo href={perfil.linkedin} className="enlace py-2 font-semibold">
              {textos.linkedin}
            </Externo>
            <Externo href={perfil.github} className="enlace py-2 font-semibold">
              GitHub
            </Externo>
          </div>
          <h3 className="mb-3 mt-12 text-base font-semibold">
            {textos.disponibilidadTitulo}
          </h3>
          <ol className="max-w-[48rem] divide-y divide-linea border-y border-linea">
            {textos.disponibilidad.map((d, i) => (
              <li
                key={d.lead}
                className="flex flex-wrap items-baseline gap-x-4 py-3"
              >
                <span
                  aria-hidden="true"
                  className="font-display italic text-terracota"
                >
                  {i + 1}
                </span>
                <span className="w-24 font-semibold">{d.lead}</span>
                <span className="text-suave">{d.texto}</span>
              </li>
            ))}
          </ol>
        </Seccion>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-linea px-6 py-10 text-sm text-suave sm:px-8">
        © {new Date().getFullYear()} {perfil.nombre}. {textos.pie}
      </footer>

      <Visor c={enVisor} onCerrar={() => setEnVisor(null)} />
    </AbrirVisor.Provider>
  );
}

import {
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
  stack,
  textos,
} from "./content";
import { marcas } from "./iconos";
import {
  Arriba,
  Check,
  Copiar,
  Correo,
  FlechaDiagonal,
  Marca,
  Mas,
  Menos,
} from "./iconos-ui";
import { Captura, ProveedorVisor, Visor, type CapturaDatos } from "./capturas";

const secciones = [
  { id: "proyecto", nombre: textos.nav.proyecto },
  { id: "stack", nombre: textos.nav.stack },
  { id: "experiencia", nombre: textos.nav.experiencia },
  { id: "contacto", nombre: textos.nav.contacto },
];

const retraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const nombreDe = (i: { id: string; nombre?: string }) =>
  i.nombre ?? marcas[i.id]?.nombre ?? i.id;

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

/** Aparición suave, una sola vez, al entrar en pantalla. `delay` escalona las tarjetas de una misma fila. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Sin observer, o si el bloque ya quedó arriba (enlace directo a #seccion), se muestra de una vez.
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
    <div
      ref={ref}
      className={`reveal${visible ? " visible" : ""} ${className}`}
      style={retraso(delay)}
    >
      {children}
    </div>
  );
}

const Contenedor = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`}>
    {children}
  </div>
);

function Seccion({
  id,
  titulo,
  aside,
  children,
}: {
  id: string;
  titulo: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="scroll-mt-20 py-14 md:py-20"
    >
      <Contenedor>
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mb-10">
            <h2
              id={`${id}-titulo`}
              className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
            >
              {titulo}
            </h2>
            {aside}
          </div>
        </Reveal>
        {children}
      </Contenedor>
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
    <dl className="divide-y divide-linea">
      {items.map((i) => (
        <div key={i.lead} className="py-4 first:pt-0 last:pb-0">
          <dt className="font-semibold">{i.lead}</dt>
          <dd className="mt-1 text-[0.9375rem] text-suave">{i.texto}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Lista de tecnologías con su logo; el logo es monocromo y toma su color de marca al pasar el cursor. */
function ChipsStack({ ids }: { ids: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <li
          key={id}
          className="chip group"
          style={{ "--marca": marcas[id]?.hex } as CSSProperties}
        >
          <span className="text-tinta/70 transition-colors group-hover:text-[color:var(--marca)]">
            <Marca id={id} className="size-4" />
          </span>
          {nombreDe({ id })}
        </li>
      ))}
    </ul>
  );
}

function Video() {
  const { youtubeId, archivo, titulo } = proyecto.video;
  if (youtubeId) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl border border-linea bg-superficie shadow-tarjeta">
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
        className="aspect-video w-full rounded-2xl border border-linea bg-superficie shadow-tarjeta"
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

/** Botón que abre y cierra un bloque (a diferencia de <details>, también puede volver a plegarlo). */
function Alternar({
  abierto,
  onClick,
  abrir,
  cerrar,
  id,
}: {
  abierto: boolean;
  onClick: () => void;
  abrir: string;
  cerrar: string;
  id: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={abierto}
      aria-controls={id}
      className="btn btn-borde"
    >
      {abierto ? <Menos /> : <Mas />}
      {abierto ? cerrar : abrir}
    </button>
  );
}

function PantallasProyecto() {
  const { galeria, movil } = proyecto.capturas;
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="mt-10">
      <Alternar
        abierto={abierto}
        onClick={() => setAbierto((a) => !a)}
        abrir={`${textos.verMasPantallas} (${galeria.length + 1})`}
        cerrar={textos.ocultarPantallas}
        id="mas-pantallas-proyecto"
      />
      <div id="mas-pantallas-proyecto" hidden={!abierto}>
        {abierto ? (
          <div className="mt-8 grid gap-x-6 gap-y-8 md:grid-cols-[1fr_14rem]">
            <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {galeria.map((c) => (
                <li key={c.src}>
                  <Captura c={c} />
                </li>
              ))}
            </ul>
            <div className="max-w-[15rem] md:max-w-none">
              <Captura c={movil} sizes="224px" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Pantallas de los addons con filtro por addon, para no perder a cuál pertenece cada una. */
function PantallasAddons() {
  const { items, visibles } = experiencia.capturas;
  const addons = Array.from(new Set(items.map((i) => i.addon)));
  const [filtro, setFiltro] = useState("todos");
  const [todas, setTodas] = useState(false);
  const lista =
    filtro === "todos"
      ? todas
        ? items
        : items.slice(0, visibles)
      : items.filter((i) => i.addon === filtro);
  const ocultas = items.length - visibles;
  return (
    <div>
      <div
        role="group"
        aria-label={textos.filtrarPantallas}
        className="mb-6 flex flex-wrap gap-2"
      >
        {["todos", ...addons].map((a) => (
          <button
            key={a}
            type="button"
            className="filtro"
            aria-pressed={filtro === a}
            onClick={() => setFiltro(a)}
          >
            {a === "todos" ? textos.todos : a}
          </button>
        ))}
      </div>
      <ul
        id="pantallas-addons"
        className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {lista.map((c) => (
          <li key={c.src}>
            <Captura c={c} />
          </li>
        ))}
      </ul>
      {filtro === "todos" && ocultas > 0 ? (
        <div className="mt-8">
          <Alternar
            abierto={todas}
            onClick={() => setTodas((t) => !t)}
            abrir={`${textos.verMasPantallas} (${ocultas})`}
            cerrar={textos.ocultarPantallas}
            id="pantallas-addons"
          />
        </div>
      ) : null}
    </div>
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
      <button type="button" onClick={copiar} className="btn btn-primario">
        {copiado ? <Check /> : <Copiar />}
        {copiado ? textos.correoCopiado : textos.copiarCorreo}
      </button>
      <span className="sr-only" aria-live="polite">
        {copiado ? textos.correoCopiado : ""}
      </span>
    </>
  );
}

/** Hora local de Ciudad de Guatemala; se pinta ya montado para no desajustar el primer render. */
function Hora() {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("es-GT", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Guatemala",
    });
    const actualizar = () => setHora(f.format(new Date()));
    actualizar();
    const t = setInterval(actualizar, 20000);
    return () => clearInterval(t);
  }, []);
  if (!hora) return null;
  return (
    <span className="tabular-nums">
      <span className="sr-only">{textos.horaLocal}: </span>
      {hora}
    </span>
  );
}

/** Cinta de tecnologías: se detiene al pasar el cursor y queda estática con "reducir movimiento". */
function Cinta() {
  const items = stack.grupos.flatMap((g) => g.items);
  const lista = (copia: boolean) => (
    <ul
      aria-hidden={copia || undefined}
      className={`flex shrink-0 items-center gap-10 pr-10${copia ? " cinta-copia" : ""}`}
    >
      {items.map((i) => (
        <li
          key={i.id}
          className="flex items-center gap-2.5 whitespace-nowrap text-[0.9375rem] text-suave"
        >
          <Marca id={i.id} className="size-5" />
          {nombreDe(i)}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="cinta overflow-hidden border-y border-linea py-5"
      role="region"
      aria-label={stack.titulo}
    >
      <div className="cinta-pista flex w-max">
        {lista(false)}
        {lista(true)}
      </div>
    </div>
  );
}

function Ventana({ ruta }: { ruta: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center gap-1.5 border-b border-linea bg-arena px-3 py-2 text-xs text-suave"
    >
      <span className="size-2 rounded-full bg-borde" />
      <span className="size-2 rounded-full bg-borde" />
      <span className="size-2 rounded-full bg-borde" />
      <span className="ml-2 truncate">{ruta}</span>
    </span>
  );
}

export default function App() {
  const activa = useSeccionActiva();
  const [enVisor, setEnVisor] = useState<CapturaDatos | null>(null);
  // Al abrir con #seccion, el navegador salta antes de que React pinte: se repite el salto ya montado.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  const hayVideo = Boolean(proyecto.video.youtubeId || proyecto.video.archivo);
  const principal = proyecto.capturas.principal;
  const miniatura = principal.src.replace(/\.webp$/, "-800.webp");
  return (
    <ProveedorVisor onAbrir={setEnVisor}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-full focus:bg-tinta focus:px-4 focus:py-2 focus:text-white"
      >
        {textos.irAlContenido}
      </a>

      <header className="sticky top-0 z-20 pt-3">
        <Contenedor>
          <div className="flex items-center justify-between gap-2 rounded-full border border-linea bg-superficie/95 py-1.5 pl-1.5 pr-1.5 shadow-tarjeta backdrop-blur sm:pl-2">
            <a
              href="#inicio"
              className="flex shrink-0 items-center gap-2.5 rounded-full pr-1 no-underline sm:pr-2"
              aria-label={`${perfil.nombre.split(" ")[0]} López`}
            >
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-full bg-tinta font-display text-lg leading-none text-white sm:size-9"
              >
                VL
              </span>
              <span className="hidden text-[0.9375rem] font-semibold tracking-tight sm:inline">
                Victor López
              </span>
            </a>
            <nav
              aria-label={textos.seccionesNav}
              className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex items-center">
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
            <a
              href={`mailto:${perfil.correo}`}
              className="btn btn-primario hidden h-9 px-4 text-sm md:inline-flex"
            >
              {textos.escribeme}
            </a>
          </div>
        </Contenedor>
      </header>

      <main id="contenido">
        <section id="inicio" className="pb-12 pt-6 md:pb-16 md:pt-8">
          <Contenedor>
            <div className="grid gap-4 lg:grid-cols-12">
              <div
                className="entrada tarjeta flex flex-col justify-between gap-10 rounded-3xl p-7 sm:p-10 lg:col-span-7"
                style={retraso(80)}
              >
                <div>
                  <h1 className="text-balance text-[clamp(2.75rem,5.6vw,4.5rem)] leading-[1.02] tracking-[-0.02em]">
                    {perfil.titular.antes}
                    <em className="text-terracota">
                      {perfil.titular.destacado}
                    </em>
                    {perfil.titular.despues}
                  </h1>
                  <p className="mt-6 max-w-[56ch] text-[1.0625rem] text-suave">
                    <span className="font-medium text-tinta">
                      {perfil.rol} en {perfil.ciudad}.
                    </span>{" "}
                    {perfil.intro}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <div className="flex flex-wrap gap-3">
                    <a href="#proyecto" className="btn btn-primario">
                      {textos.verProyecto}
                    </a>
                    <a
                      href={`mailto:${perfil.correo}`}
                      className="btn btn-borde"
                    >
                      <Correo />
                      {textos.escribeme}
                    </a>
                  </div>
                  <p className="flex items-center gap-2.5 text-sm font-medium">
                    <span
                      aria-hidden="true"
                      className="punto-activo size-2.5 rounded-full bg-activo"
                    />
                    {perfil.estado}
                  </p>
                </div>
              </div>

              <a
                href="#proyecto"
                className="entrada tarjeta-viva group flex flex-col overflow-hidden rounded-3xl lg:col-span-5"
                style={retraso(200)}
              >
                <Ventana ruta={`adopciones.merakigt.org${principal.ruta}`} />
                <img
                  src={miniatura}
                  alt=""
                  width={800}
                  height={500}
                  loading="eager"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-left-top lg:aspect-auto lg:min-h-0 lg:flex-1"
                />
                <span className="flex items-center justify-between gap-4 border-t border-linea px-5 py-4">
                  <span>
                    <span className="block font-semibold">
                      {proyecto.nombre}
                    </span>
                    <span className="block text-sm text-suave">
                      {textos.subtituloProyecto}
                    </span>
                  </span>
                  <FlechaDiagonal className="size-5 shrink-0 text-suave transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracota" />
                </span>
              </a>

              {perfil.hechos.map((h, i) => (
                <a
                  key={h.dt}
                  href={h.href}
                  className="entrada tarjeta-viva group flex flex-col gap-1.5 p-5 lg:col-span-4"
                  style={retraso(320 + i * 90)}
                >
                  <span className="flex items-center justify-between text-sm text-suave">
                    {h.dt}
                    <FlechaDiagonal className="size-4 opacity-0 transition duration-300 group-hover:opacity-100" />
                  </span>
                  <span className="font-medium">{h.dd}</span>
                </a>
              ))}
            </div>
          </Contenedor>
        </section>

        <Cinta />

        <Seccion
          id="proyecto"
          titulo={proyecto.nombre}
          aside={
            <p className="chip">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-activo"
              />
              {textos.subtituloProyecto}
            </p>
          }
        >
          <Reveal className="grid items-start gap-6 lg:grid-cols-12">
            <p className="max-w-[62ch] text-lg lg:col-span-8">
              {proyecto.descripcion}
            </p>
            <ul className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <li>
                <Externo href={proyecto.sitio} className="btn btn-primario">
                  {textos.verSitio}
                  <FlechaDiagonal />
                </Externo>
              </li>
              <li>
                <Externo href={proyecto.codigo} className="btn btn-borde">
                  <Marca id="github" className="size-4" />
                  {textos.verCodigo}
                </Externo>
              </li>
            </ul>
          </Reveal>

          <Reveal className="mt-10">
            <Captura
              c={principal}
              prioridad
              sizes="(min-width: 1152px) 1088px, 100vw"
            />
          </Reveal>

          {hayVideo ? (
            <Reveal className="mt-10">
              <Video />
            </Reveal>
          ) : null}

          <Reveal className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-10">
            <h3 className="font-display text-[2rem] leading-none tracking-[-0.01em] lg:col-span-4">
              {textos.problema}
            </h3>
            <p className="max-w-[44ch] font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.25] lg:col-span-8">
              {proyecto.problema}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal className="tarjeta p-6 sm:p-8">
              <h3 className="titulo-tarjeta mb-6">{textos.construi}</h3>
              <Filas items={proyecto.construi} />
            </Reveal>
            <Reveal className="tarjeta p-6 sm:p-8" delay={120}>
              <h3 className="titulo-tarjeta mb-6">{textos.decisiones}</h3>
              <Filas items={proyecto.decisiones} />
            </Reveal>
          </div>

          <Reveal className="tarjeta mt-4 grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h3 className="titulo-tarjeta mb-3">{textos.proceso}</h3>
              <p className="max-w-[62ch] text-[0.9375rem] text-suave">
                {proyecto.proceso}
              </p>
            </div>
            <div className="lg:col-span-5">
              <h3 className="mb-3 text-sm text-suave">{stack.titulo}</h3>
              <ChipsStack ids={proyecto.stack} />
            </div>
          </Reveal>

          <PantallasProyecto />
        </Seccion>

        <Seccion id="stack" titulo={stack.titulo}>
          <Reveal className="-mt-4 mb-10 max-w-[56ch] text-lg text-suave md:-mt-6">
            <p>{stack.subtitulo}</p>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            {stack.grupos.map((g, gi) => (
              <Reveal key={g.titulo} className="tarjeta p-6" delay={gi * 110}>
                <h3 className="titulo-tarjeta mb-5">{g.titulo}</h3>
                <ul className="space-y-1">
                  {g.items.map((i) => (
                    <li
                      key={i.id}
                      className="group -mx-2 flex items-center gap-3.5 rounded-xl px-2 py-2 transition-colors hover:bg-arena"
                      style={{ "--marca": marcas[i.id]?.hex } as CSSProperties}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-linea bg-superficie text-tinta/75 transition-colors group-hover:text-[color:var(--marca)]">
                        <Marca id={i.id} className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium leading-tight">
                          {nombreDe(i)}
                        </span>
                        <span className="block text-sm leading-snug text-suave">
                          {i.nota}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Seccion>

        <Seccion id="experiencia" titulo={textos.tituloExperiencia}>
          <div className="grid gap-4 lg:grid-cols-12">
            <Reveal className="tarjeta flex flex-col gap-8 self-start p-6 sm:p-8 lg:sticky lg:top-24 lg:col-span-4">
              <div>
                <p className="text-xl font-semibold tracking-tight">
                  {experiencia.empresa}
                </p>
                <Externo
                  href={experiencia.equipo.sitio}
                  className="enlace text-[0.9375rem]"
                >
                  {experiencia.equipo.nombre}
                </Externo>
                <p className="mt-4 text-[0.9375rem] text-suave">
                  {experiencia.cargo}
                  <br />
                  {experiencia.fechas}
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-sm text-suave">{stack.titulo}</h3>
                <ChipsStack ids={experiencia.stack} />
              </div>
            </Reveal>
            <Reveal className="tarjeta p-6 sm:p-8 lg:col-span-8" delay={120}>
              <p className="max-w-[62ch] text-[0.9375rem] text-suave">
                {experiencia.contexto}
              </p>
              <ul className="mt-6 divide-y divide-linea border-t border-linea">
                {experiencia.puntos.map((p) => (
                  <li
                    key={p.lead}
                    className="grid gap-1.5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
                  >
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="font-semibold">{p.lead}</span>
                      {p.modo ? (
                        <span className="rounded-full bg-hundido px-2.5 py-0.5 text-xs font-medium text-suave">
                          {p.modo === "enEquipo"
                            ? textos.enEquipo
                            : textos.individual}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[0.9375rem] text-suave">{p.texto}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <h3 className="font-display text-[2rem] leading-none tracking-[-0.01em]">
              {experiencia.capturas.titulo}
            </h3>
            <p className="mb-8 mt-3 max-w-[62ch] text-[0.9375rem] text-suave">
              {experiencia.capturas.nota}
            </p>
            <PantallasAddons />
          </Reveal>

          <div className="mt-16 grid gap-4 lg:grid-cols-12">
            <Reveal className="tarjeta p-6 sm:p-8 lg:col-span-8">
              <h3 className="titulo-tarjeta">{textos.formacion}</h3>
              <p className="mt-4 max-w-[28ch] font-display text-[1.75rem] leading-[1.15]">
                {formacion.titulo}
              </p>
              <p className="mt-3 text-[0.9375rem] text-suave">
                {formacion.institucion}. {formacion.fechas}.
              </p>
            </Reveal>
            <Reveal className="tarjeta p-6 sm:p-8 lg:col-span-4" delay={120}>
              <dl className="space-y-5">
                {extras.map((x) => (
                  <div key={x.lead}>
                    <dt className="titulo-tarjeta">{x.lead}</dt>
                    <dd className="mt-2 text-[0.9375rem] text-suave">
                      {x.texto}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Seccion>

        <Seccion id="contacto" titulo={textos.tituloContacto}>
          <Reveal className="tarjeta grid gap-10 rounded-3xl p-7 sm:p-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="max-w-[34ch] font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.2]">
                {textos.contacto}
              </p>
              <a
                href={`mailto:${perfil.correo}`}
                className="enlace mt-8 block break-all font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-tight"
              >
                {perfil.correo}
              </a>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CopiarCorreo />
                <Externo href={perfil.linkedin} className="btn btn-borde">
                  {textos.linkedin}
                </Externo>
                <Externo href={perfil.github} className="btn btn-borde">
                  <Marca id="github" className="size-4" />
                  GitHub
                </Externo>
              </div>
            </div>
            <div className="lg:col-span-5">
              <h3 className="titulo-tarjeta mb-4">
                {textos.disponibilidadTitulo}
              </h3>
              <ol className="divide-y divide-linea border-y border-linea">
                {textos.disponibilidad.map((d, i) => (
                  <li
                    key={d.lead}
                    className="grid grid-cols-[1.5rem_1fr] gap-x-3 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-xl leading-6 text-terracota"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{d.lead}</p>
                      <p className="text-[0.9375rem] text-suave">{d.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Seccion>
      </main>

      <footer className="border-t border-linea">
        <Contenedor className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-8 text-sm text-suave">
          <p>
            © {new Date().getFullYear()} {perfil.nombre}. {textos.pie} <Hora />
          </p>
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 font-medium text-tinta no-underline transition-colors hover:text-terracota"
          >
            {textos.volverArriba}
            <Arriba />
          </a>
        </Contenedor>
      </footer>

      <Visor c={enVisor} onCerrar={() => setEnVisor(null)} />
    </ProveedorVisor>
  );
}

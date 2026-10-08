import { useEffect, useState } from "react";
import {
  experiencia,
  formacion,
  habilidades,
  perfil,
  proyecto,
  textos,
} from "./content";

const secciones = [
  { id: "perfil", nombre: "Perfil" },
  { id: "experiencia", nombre: "Experiencia" },
  { id: "proyecto", nombre: "Proyecto" },
  { id: "habilidades", nombre: "Habilidades" },
  { id: "contacto", nombre: "Contacto" },
];

function Foto() {
  const [existe, setExiste] = useState(true);
  if (!existe) return null;
  return (
    <img
      src="/foto.jpg"
      alt={`Foto de ${perfil.nombre}`}
      width={112}
      height={112}
      onError={() => setExiste(false)}
      className="mb-6 h-28 w-28 rounded-full object-cover"
    />
  );
}

function useSeccionActiva() {
  const [activa, setActiva] = useState(secciones[0].id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => e.isIntersecting && setActiva(e.target.id));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    secciones.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return activa;
}

function Seccion({
  id,
  titulo,
  children,
}: {
  id: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={titulo}
      className="mb-24 scroll-mt-20 lg:mb-32"
    >
      <h2 className="mb-8 text-2xl font-bold tracking-tight">{titulo}</h2>
      {children}
    </section>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 border-l-2 border-maiz/60 pl-5">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const activa = useSeccionActiva();
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-maiz focus:px-4 focus:py-2 focus:text-noche"
      >
        {textos.irAlContenido}
      </a>
      <div className="banda" role="presentation" />
      <nav
        aria-label="Secciones"
        className="sticky top-0 z-10 bg-noche/90 px-6 py-3 backdrop-blur sm:px-12 lg:hidden"
      >
        <ul className="flex gap-5 overflow-x-auto font-display font-medium">
          {secciones.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={activa === s.id ? "true" : undefined}
                className={activa === s.id ? "text-claro" : undefined}
              >
                {s.nombre}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:flex lg:justify-between lg:gap-8 lg:px-16">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-24">
          <div className="pt-14 lg:pt-0">
            <Foto />
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {perfil.nombre}
            </h1>
            <p className="mt-3 font-display text-xl font-medium text-claro">
              {perfil.rol}
            </p>
            <p className="mt-4 max-w-xs">{textos.tagline}</p>
            <nav aria-label="Secciones" className="mt-12 hidden lg:block">
              <ul>
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
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display font-medium lg:mt-0">
            <li>
              <a href={perfil.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={perfil.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${perfil.correo}`}>Correo</a>
            </li>
          </ul>
        </header>

        <main id="contenido" className="pb-24 pt-16 lg:w-[52%] lg:py-24">
          <Seccion id="perfil" titulo="Perfil">
            <div className="max-w-[62ch] space-y-4">
              <p>{perfil.resumen}</p>
              <p>
                {formacion.titulo}, {formacion.institucion}. {formacion.fechas}.
              </p>
              <p>
                <a href={perfil.cv} download className="font-display font-bold">
                  {textos.cv}
                </a>
              </p>
            </div>
          </Seccion>

          <Seccion id="experiencia" titulo="Experiencia">
            <h3 className="text-lg font-bold">
              {experiencia.cargo}, {experiencia.empresa}
            </h3>
            <p className="mb-5 text-base text-texto/80">{experiencia.fechas}</p>
            <Lista items={experiencia.puntos} />
            <p className="mt-5 text-base">
              <span className="font-display font-bold text-claro">
                {textos.stack}
              </span>
              {experiencia.stack}
            </p>
          </Seccion>

          <Seccion id="proyecto" titulo="Proyecto de graduación">
            <h3 className="text-lg font-bold">{proyecto.nombre}</h3>
            <p className="mb-5 mt-2">{proyecto.descripcion}</p>
            <ul className="mb-10 flex flex-wrap gap-x-6 gap-y-2 font-display font-bold">
              <li>
                <a href={proyecto.sitio} target="_blank" rel="noreferrer">
                  {textos.verSitio}
                </a>
              </li>
              <li>
                <a href={proyecto.codigo} target="_blank" rel="noreferrer">
                  {textos.verCodigo}
                </a>
              </li>
            </ul>
            <div className="space-y-8">
              {proyecto.bloques.map((b) => (
                <div key={b.titulo}>
                  <h4 className="mb-2 font-display text-base font-bold text-claro">
                    {b.titulo}
                  </h4>
                  {"texto" in b && b.texto ? <p>{b.texto}</p> : null}
                  {"lista" in b && b.lista ? <Lista items={b.lista} /> : null}
                </div>
              ))}
            </div>
            <p className="mt-8 text-base">
              <span className="font-display font-bold text-claro">
                {textos.stack}
              </span>
              {proyecto.stack}
            </p>
          </Seccion>

          <Seccion id="habilidades" titulo="Habilidades">
            <dl className="space-y-4">
              {habilidades.map((h) => (
                <div key={h.grupo}>
                  <dt className="font-display font-bold text-claro">
                    {h.grupo}
                  </dt>
                  <dd>{h.detalle}</dd>
                </div>
              ))}
            </dl>
          </Seccion>

          <Seccion id="contacto" titulo="Contacto">
            <p className="max-w-[55ch]">
              {textos.contacto}{" "}
              <a href={`mailto:${perfil.correo}`} className="font-bold">
                {perfil.correo}
              </a>
              .
            </p>
          </Seccion>

          <footer className="text-sm text-texto/70">
            {textos.pie}
          </footer>
        </main>
      </div>
    </>
  );
}

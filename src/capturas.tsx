import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { textos } from "./content";

export type CapturaDatos = {
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

export const AbrirVisor = createContext<(c: CapturaDatos) => void>(() => {});

/** Captura enmarcada como ventana del sitio; al activarla se amplía en el visor. */
export function Captura({
  c,
  prioridad = false,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 48vw, 100vw",
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
            className="flex items-center gap-1.5 border-b border-linea bg-arena px-3 py-2 text-xs text-suave"
          >
            <span className="size-2 rounded-full bg-borde" />
            <span className="size-2 rounded-full bg-borde" />
            <span className="size-2 rounded-full bg-borde" />
            <span className="ml-2 truncate">
              adopciones.merakigt.org{c.ruta === "/" ? "" : c.ruta}
            </span>
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
export function Visor({
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

export function ProveedorVisor({
  onAbrir,
  children,
}: {
  onAbrir: (c: CapturaDatos) => void;
  children: ReactNode;
}) {
  return <AbrirVisor.Provider value={onAbrir}>{children}</AbrirVisor.Provider>;
}

import { marcas } from "./iconos";

// Iconos de interfaz: un solo trazo (1.75) sobre rejilla de 24, redondeado.
type Props = { className?: string };

const trazo = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const FlechaDiagonal = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Correo = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </svg>
);

export const Copiar = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
  </svg>
);

export const Check = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Mas = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Menos = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <path d="M5 12h14" />
  </svg>
);

export const Arriba = ({ className = "size-4" }: Props) => (
  <svg {...trazo} className={className}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

/** Logo de una tecnología; toma el color del texto para poder teñirlo al pasar el cursor. */
export function Marca({
  id,
  className = "size-5",
}: Props & { id: keyof typeof marcas | string }) {
  const m = marcas[id];
  if (!m) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={m.path} />
    </svg>
  );
}

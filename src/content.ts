// Todo el texto del sitio vive aquí. Edita este archivo para actualizar el portafolio.

export const perfil = {
  nombre: "Victor Estuardo López Rodríguez",
  rol: "Desarrollador Full Stack Jr.",
  resumen:
    "Construyo aplicaciones web con TypeScript, Remix y PostgreSQL que reemplazan procesos manuales por sistemas claros de usar. Tengo más de 2 años de experiencia automatizando procesos de negocio sobre un ERP.",
  correo: "vl40509@gmail.com",
  linkedin: "https://www.linkedin.com/in/victor-est-lopez-dev",
  github: "https://github.com/Victor-Estuardo",
  cv: "/cv_Victor_Lopez.pdf",
};

export const textos = {
  tagline:
    "Aplicaciones web con TypeScript, Remix y PostgreSQL. Ciudad de Guatemala.",
  contacto:
    "Busco mi primer puesto como desarrollador fullstack. Si tienes una vacante o quieres ver el proyecto en detalle, escríbeme a",
  pie: "Diseño inspirado en el sitio de Brittany Chiang, con código propio. Hecho con React, TypeScript y Tailwind.",
  cv: "Descargar CV en PDF",
  verSitio: "Visitar el sitio",
  verCodigo: "Ver el código",
  stack: "Stack: ",
  irAlContenido: "Ir al contenido",
};

export const proyecto = {
  nombre: "adopcionesApp",
  descripcion:
    "Plataforma de gestión de adopción responsable para la Asociación Meraki. Es mi proyecto de graduación, desarrollado de forma individual entre diciembre de 2025 y octubre de 2026.",
  sitio: "https://adopciones.merakigt.org",
  codigo: "https://github.com/Victor-Estuardo/adopcionesApp",
  bloques: [
    {
      titulo: "El problema",
      texto:
        "La asociación necesitaba un solo lugar para mostrar a las mascotas, recibir solicitudes de adopción, informar sobre donaciones y publicar historias del albergue, con personal administrativo que pueda gestionarlo todo sin tocar código.",
    },
    {
      titulo: "Lo que construí",
      lista: [
        "Catálogo de mascotas con búsqueda y filtros, y solicitud de adopción con formulario y carta de compromiso aceptada con fecha, hora e IP.",
        "Cuenta de usuario con verificación de correo, recuperación de contraseña, mascotas guardadas y seguimiento del estado de cada solicitud.",
        "Módulo de donaciones y transparencia: cuentas bancarias, insumos necesarios, patrocinadores y proyectos con fotos de antes, durante y después.",
        "Panel administrativo con roles y permisos configurables, estadísticas con gráficos y exportación a Excel.",
      ],
    },
    {
      titulo: "Decisiones técnicas",
      lista: [
        "Los módulos de navegación y los permisos viven en la base de datos, así que el personal activa o desactiva secciones sin desplegar código.",
        "El control de intentos y las sesiones se guardan en PostgreSQL y no en memoria, para que funcionen en un entorno serverless como Vercel.",
        "Las páginas de contenido se renderizan en el servidor para que los metadatos de SEO y la vista previa al compartir salgan con datos reales.",
        "Las contraseñas usan bcrypt, los tokens son de un solo uso y los mensajes de error no revelan si un usuario existe.",
      ],
    },
    {
      titulo: "Cómo lo trabajé",
      texto:
        "Escribí los requerimientos funcionales y no funcionales, las historias de usuario, las pruebas manuales y el manual del panel administrativo. El código tiene 25 modelos en Prisma y se desarrolló con ramas y pull requests.",
    },
  ],
  stack:
    "TypeScript, Remix, React, Prisma, PostgreSQL (Supabase), Tailwind CSS, Cloudinary, Resend y Vercel.",
};

export const experiencia = {
  cargo: "Desarrollador Web Jr.",
  empresa: "DISCOGUA",
  fechas: "Septiembre de 2023 a diciembre de 2025",
  puntos: [
    "Desarrollé funcionalidades en los addons web que automatizan procesos de negocio sobre el ERP Zauru: CRM, compras, contabilidad, AdminCresgo, mensajería, RRHH, SAC y pedidos.",
    "En el CRM trabajé la gestión de leads y cartera de clientes, cotizaciones en PDF, punto de venta y mensajería por WhatsApp con automatizaciones. El backend usaba AWS (API Gateway y Lambda), con S3, SES y SNS.",
    "En compras y contabilidad: presupuestos, reembolsos con flujo de autorización, retenciones de IVA, recepción de contenedores, recálculo de costos y confirmación de pagos, con exportación a Excel y PDF.",
    "En mensajería y SAC: asignación y aprobación de tareas, generación de rutas con Google Maps y encuestas de satisfacción vinculadas a facturas.",
    "Integré las APIs GraphQL y REST de Zauru con su autenticación OAuth, y la facturación electrónica.",
  ],
  stack:
    "TypeScript, Remix, React, Prisma, PostgreSQL, Tailwind CSS, Redux Toolkit y AWS.",
};

export const habilidades = [
  { grupo: "Lenguajes", detalle: "TypeScript, JavaScript, SQL" },
  {
    grupo: "Frontend",
    detalle: "Remix, React (nivel básico), Tailwind CSS, Ant Design",
  },
  {
    grupo: "Backend y datos",
    detalle:
      "Node.js, Prisma, PostgreSQL, APIs REST y GraphQL, AWS (API Gateway, Lambda, S3, SES)",
  },
  {
    grupo: "Herramientas",
    detalle:
      "Git, GitHub, VS Code, Postman, Vercel, Netlify, Supabase, Cloudinary",
  },
  { grupo: "Conocimientos básicos", detalle: "MySQL y Oracle" },
  {
    grupo: "Idiomas",
    detalle: "Español nativo. Inglés técnico: leo documentación y código.",
  },
];

export const formacion = {
  titulo: "Ingeniería en Sistemas de Información y Ciencias de la Computación",
  institucion: "Universidad Mariano Gálvez de Guatemala",
  fechas: "2020 a 2026, cierre de pensum previsto en noviembre de 2026",
};

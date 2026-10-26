// Todo el texto del sitio vive aquí. Edita este archivo para actualizar el portafolio.

export const perfil = {
  nombre: "Victor Estuardo López Rodríguez",
  rol: "Desarrollador Full Stack",
  ciudad: "Ciudad de Guatemala",
  titular: {
    antes: "Sistemas web que reemplazan procesos manuales y se sienten ",
    destacado: "claros de usar",
    despues: ".",
  },
  intro:
    "Trabajo con TypeScript, Remix y PostgreSQL. Tengo más de 2 años automatizando procesos de negocio sobre un ERP, y construí por mi cuenta la plataforma de adopción que hoy usa una asociación en Guatemala.",
  correo: "contacto@victorestuardo.com",
  linkedin: "https://www.linkedin.com/in/victor-est-lopez-dev",
  github: "https://github.com/Victor-Estuardo",
  // Estado junto al titular y en el encabezado.
  estado: "Disponible ahora · remoto",
  // Tarjetas bajo el titular: lo que un reclutador necesita saber sin bajar. `href` es la sección que abre cada una.
  hechos: [
    {
      dt: "Último proyecto",
      dd: "adopcionesApp, en producción (dic. 2025 – oct. 2026)",
      href: "#proyecto",
    },
    {
      dt: "Experiencia",
      dd: "DISCOGUA · equipo Roo (2023 – 2025)",
      href: "#experiencia",
    },
    {
      dt: "Disponibilidad",
      dd: "Remoto disponibilidad inmediata · híbrido o presencial desde dic. 2026 – ene. 2027",
      href: "#contacto",
    },
  ],
};

export const textos = {
  contacto:
    "Busco mi siguiente rol como desarrollador Full Stack. Si tienes una vacante o quieres ver el proyecto en detalle, escríbeme.",
  // En orden de preferencia.
  disponibilidad: [
    { lead: "Remoto", texto: "Disponibilidad inmediata." },
    {
      lead: "Híbrido",
      texto:
        "En Ciudad de Guatemala, a partir de diciembre de 2026 o enero de 2027.",
    },
    {
      lead: "Presencial",
      texto:
        "En Ciudad de Guatemala, a partir de diciembre de 2026 o enero de 2027.",
    },
  ],
  disponibilidadTitulo: "Modalidad, en orden de preferencia",
  copiarCorreo: "Copiar correo",
  correoCopiado: "Correo copiado",
  linkedin: "Perfil completo en LinkedIn",
  pie: "Ciudad de Guatemala.",
  verMasPantallas: "Ver más pantallas",
  ocultarPantallas: "Ocultar pantallas",
  todos: "Todos",
  filtrarPantallas: "Filtrar pantallas por addon",
  // Navegación y títulos de sección.
  nav: {
    proyecto: "Proyecto",
    stack: "Stack",
    experiencia: "Experiencia",
    contacto: "Contacto",
  },
  tituloExperiencia: "Experiencia",
  tituloContacto: "Contacto",
  formacion: "Formación",
  seccionesNav: "Secciones",
  enEquipo: "En equipo",
  individual: "Individual",
  volverArriba: "Volver arriba",
  horaLocal: "Hora en Ciudad de Guatemala",
  ampliar: "Ampliar",
  cerrar: "Cerrar",
  desliza: "Desliza para recorrer la pantalla completa.",
  verSitio: "Visitar el sitio",
  verProyecto: "Ver proyecto",
  escribeme: "Escríbeme",
  masPantallas: "Más pantallas",
  verCodigo: "Ver el código",
  nuevaPestana: " (abre en una pestaña nueva)",
  problema: "El problema",
  construi: "Lo que construí",
  decisiones: "Decisiones técnicas",
  proceso: "Cómo lo trabajé",
  subtituloProyecto: "En producción para la Asociación Meraki",
  stack: "Stack: ",
  irAlContenido: "Ir al contenido",
};

export const proyecto = {
  nombre: "adopcionesApp",
  descripcion:
    "Plataforma en producción con la que la Asociación Meraki publica sus mascotas, recibe solicitudes de adopción y administra donaciones. La desarrollé de forma individual, desde los requerimientos hasta el manual del panel administrativo.",
  sitio: "https://adopciones.merakigt.org",
  codigo: "https://github.com/Victor-Estuardo/adopcionesApp",
  // Video del recorrido: pega el ID de YouTube (video "no listado") o la ruta de un mp4 en /public.
  // Mientras ambos estén vacíos, el bloque de video no se muestra.
  video: {
    youtubeId: "",
    archivo: "",
    titulo: "Recorrido por adopcionesApp",
  },
  // Capturas tomadas de una instancia con datos de prueba; viven en /public/capturas.
  // `principal` va grande bajo la descripción; `galeria` se muestra después de las decisiones técnicas.
  // Ancho y alto son los del archivo, para reservar espacio mientras carga.
  capturas: {
    principal: {
      src: "/capturas/admin-estadisticas.webp",
      alt: "Panel de estadísticas: 8 solicitudes en el periodo, 75 % de aprobación, 5.9 días promedio de decisión, gráfica de tendencia y distribución por estado",
      pie: "Panel administrativo · Estadísticas con filtros por periodo y exportación a Excel",
      ruta: "/estadisticas",
      ancho: 1600,
      alto: 1000,
    },
    galeria: [
      {
        src: "/capturas/admin-solicitud.webp",
        alt: "Detalle de una solicitud de adopción en revisión, con pasos Enviada, En revisión y Decisión final y botones para aprobar o rechazar",
        pie: "Revisión de solicitudes por etapas",
        ruta: "/solicitudes",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/admin-rol-permisos.webp",
        alt: "Formulario de nuevo rol con una matriz de permisos por módulo: leer, crear, actualizar y eliminar",
        pie: "Roles con permisos por módulo",
        ruta: "/roles",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/admin-historia-editor.webp",
        alt: "Editor de historias con estado publicada, categoría, enlace fijo, resumen y contadores de caracteres",
        pie: "Editor de historias con borrador y publicación",
        ruta: "/historias",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/catalogo.webp",
        alt: "Catálogo público de mascotas con buscador, filtros y estado de cada mascota",
        pie: "Catálogo público con búsqueda y filtros",
        ruta: "/",
        ancho: 1600,
        alto: 1000,
      },
    ],
    movil: {
      src: "/capturas/ficha-mascota-movil.webp",
      alt: "Ficha de una mascota en un teléfono, con fotos, datos y botón para solicitar la adopción",
      pie: "Ficha de mascota en el teléfono",
      ancho: 780,
      alto: 1688,
    },
  },
  problema:
    "La asociación necesitaba un solo lugar para mostrar a las mascotas, recibir solicitudes de adopción, informar sobre donaciones y publicar historias del albergue, con personal administrativo que pueda gestionarlo todo sin tocar código.",
  construi: [
    {
      lead: "Catálogo y adopción",
      texto:
        "Mascotas con búsqueda y filtros. La solicitud incluye una carta de compromiso aceptada con fecha, hora e IP.",
    },
    {
      lead: "Cuentas de usuario",
      texto:
        "Verificación de correo, recuperación de contraseña, mascotas guardadas y seguimiento del estado de cada solicitud.",
    },
    {
      lead: "Donaciones y transparencia",
      texto:
        "Cuentas bancarias, insumos necesarios, patrocinadores y proyectos con fotos de antes, durante y después.",
    },
    {
      lead: "Panel administrativo",
      texto:
        "Roles y permisos configurables, estadísticas con gráficos y exportación a Excel.",
    },
  ],
  decisiones: [
    {
      lead: "Módulos en la base de datos",
      texto:
        "La navegación y los permisos viven en la base de datos: el personal activa o desactiva secciones sin desplegar código.",
    },
    {
      lead: "Sesiones fuera de la memoria",
      texto:
        "El control de intentos y las sesiones se guardan en PostgreSQL para que funcionen en un entorno serverless como Vercel.",
    },
    {
      lead: "Render en el servidor",
      texto:
        "Las páginas de contenido se renderizan en el servidor para que los metadatos de SEO y la vista previa al compartir salgan con datos reales.",
    },
    {
      lead: "Seguridad",
      texto:
        "Contraseñas con bcrypt, tokens de un solo uso y mensajes de error que no revelan si un usuario existe.",
    },
  ],
  proceso:
    "Partí de requerimientos funcionales y no funcionales e historias de usuario; modelé 25 tablas en Prisma, trabajé con ramas y pull requests, hice pruebas manuales y entregué un manual del panel administrativo.",
  // Ids de `marcas` (src/iconos.ts).
  stack: [
    "typescript",
    "remix",
    "react",
    "prisma",
    "postgresql",
    "supabase",
    "tailwind",
    "cloudinary",
    "resend",
    "vercel",
  ],
};

export const experiencia = {
  cargo: "Desarrollador Web",
  empresa: "DISCOGUA",
  equipo: { nombre: "Equipo Roo", sitio: "https://www.roo.com.gt/" },
  fechas: "Septiembre de 2023 a diciembre de 2025",
  contexto:
    "Roo es el equipo de automatización de DISCOGUA, distribuidor autorizado del ERP Zauru en Guatemala. Construíamos addons: aplicaciones web propias que usan las APIs de Zauru para quitarles a las empresas clientes procesos manuales y repetitivos. Éramos 4 programadores y una diseñadora; cada proyecto lo llevábamos en promedio entre 2.",
  puntos: [
    {
      lead: "CRM",
      modo: "enEquipo",
      texto:
        "Construí cerca de la mitad, frontend y backend, durante un año: cartera, oportunidades, cotizaciones en PDF, punto de venta y chats de WhatsApp con automatizaciones. Backend serverless en AWS (API Gateway, Lambda, S3, SES y SNS).",
    },
    {
      lead: "SAC",
      modo: "individual",
      texto:
        "Mi primer addon, incluido el diseño: encuestas de satisfacción generadas desde los formularios de Zauru por cada compra.",
    },
    {
      lead: "AdminCresgo",
      modo: "individual",
      texto:
        "Para una importadora de pacas de ropa, a partir del diseño en Figma: ingreso de inventario a reserva, reparto por región con propuesta y autorización, y reasignación.",
    },
    {
      lead: "Automatizaciones",
      modo: "enEquipo",
      texto:
        "Compras, contabilidad y mensajería: cargas masivas, reembolsos con autorización, retenciones de IVA y rutas con Google Maps. Por mi estimación, tareas de días pasaron a resolverse en horas.",
    },
    {
      lead: "Integraciones",
      texto:
        "APIs GraphQL y REST de Zauru con su autenticación OAuth, y facturación electrónica.",
    },
  ],
  // Ids de `marcas` (src/iconos.ts).
  stack: [
    "typescript",
    "remix",
    "react",
    "prisma",
    "postgresql",
    "tailwind",
    "redux",
    "aws",
  ],
  // Pantallas de los addons levantadas con su código original y datos ficticios, sin marca del cliente.
  capturas: {
    titulo: "Pantallas de los addons",
    nota: "Son recreaciones con datos ficticios: los addons originales funcionan sobre Zauru y no se pueden mostrar con información real. El CRM lo construimos en equipo; SAC y AdminCresgo los hice solo.",
    // Las primeras `visibles` se muestran siempre (una por addon); el resto queda detrás de "Ver más pantallas".
    visibles: 3,
    items: [
      {
        src: "/capturas/roo/crm-chat.webp",
        addon: "CRM",
        alt: "Conversación de WhatsApp dentro del CRM, con notas y datos del contacto a la izquierda",
        pie: "CRM · Conversación de WhatsApp con el cliente",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/sac-encuesta.webp",
        addon: "SAC",
        alt: "Encuesta de satisfacción con escala de caritas del 1 al 5, comentario y datos del cliente y la factura a la izquierda",
        pie: "SAC · Encuesta por compra, con diseño propio",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/reservas-asignacion.webp",
        addon: "AdminCresgo",
        alt: "Asignación de una categoría de pacas entre cinco regiones con lo vendido, el porcentaje, lo propuesto y lo autorizado",
        pie: "AdminCresgo · Reparto por región propuesto según ventas",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/crm-cotizacion.webp",
        addon: "CRM",
        alt: "Detalle de una cotización con contacto, productos, cantidades, total en quetzales y datos de entrega",
        pie: "CRM · Detalle de cotización con productos y entrega",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/crm-interacciones.webp",
        addon: "CRM",
        alt: "Bandeja de chats de WhatsApp y Messenger con último mensaje, hora, vendedor asignado y seguimiento",
        pie: "CRM · Bandeja de chats por vendedor",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/crm-pos.webp",
        addon: "CRM",
        alt: "Órdenes del punto de venta con referencia, cliente, fecha de entrega, total y saldo pendiente",
        pie: "CRM · Órdenes del punto de venta",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/sac-bandeja.webp",
        addon: "SAC",
        alt: "Bandeja de facturas pendientes de encuestar con filtros por fecha, categoría, etiqueta y vendedor, y opción de reagendar",
        pie: "SAC · Facturas por encuestar, con filtros y reagendado",
        ancho: 1600,
        alto: 1000,
      },
      {
        src: "/capturas/roo/reservas-ingreso.webp",
        addon: "AdminCresgo",
        alt: "Ingreso de pacas a reserva desde un consolidado, con código, categoría, cantidad y precio sugerido",
        pie: "AdminCresgo · Ingreso a reserva desde un consolidado",
        ancho: 1600,
        alto: 1000,
      },
    ],
  },
};

// Filas al final de Experiencia. Las herramientas (Git, Postman, Vercel…) viven ahora en `stack`.
export const extras = [
  {
    lead: "Idiomas",
    texto: "Español nativo. Inglés técnico: leo documentación y código.",
  },
];

export const formacion = {
  titulo: "Ingeniería en Sistemas de Información y Ciencias de la Computación",
  institucion: "Universidad Mariano Gálvez de Guatemala",
  fechas: "2020 a 2026, cierre de pensum previsto en noviembre de 2026",
};

// Sección Stack: agrupado por capa. `id` apunta a `marcas` (src/iconos.ts); `nombre` solo si difiere del de la marca.
export const stack = {
  titulo: "Stack",
  subtitulo:
    "Tecnologías con las que he trabajado, por capa. Las que usé en proyectos reales llevan el contexto.",
  grupos: [
    {
      titulo: "Frontend",
      items: [
        { id: "typescript", nota: "Lenguaje principal" },
        { id: "react", nota: "Interfaces" },
        { id: "remix", nota: "Framework full stack" },
        { id: "tailwind", nota: "Estilos" },
        { id: "redux", nota: "Estado del cliente, en el CRM" },
        { id: "antd", nota: "Componentes de interfaz" },
      ],
    },
    {
      titulo: "Backend y datos",
      items: [
        { id: "prisma", nota: "ORM, 25 tablas en adopcionesApp" },
        { id: "postgresql", nota: "Base de datos" },
        { id: "supabase", nota: "PostgreSQL gestionado" },
        {
          id: "graphql",
          nombre: "GraphQL y REST",
          nota: "APIs de Zauru con OAuth",
        },
        { id: "aws", nota: "API Gateway, Lambda, S3, SES y SNS" },
        { id: "resend", nota: "Correo" },
      ],
    },
    {
      titulo: "Despliegue y herramientas",
      items: [
        { id: "vercel", nota: "Despliegue de adopcionesApp" },
        { id: "netlify", nota: "Despliegue" },
        { id: "cloudinary", nota: "Imágenes" },
        { id: "git", nota: "Ramas y pull requests" },
        { id: "github", nota: "Repositorios" },
        { id: "postman", nota: "Pruebas de API" },
        { id: "figma", nota: "Implementación desde diseños" },
      ],
    },
  ],
};

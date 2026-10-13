# Portafolio de Victor López

Sitio de una sola página hecho con Vite, React, TypeScript y Tailwind CSS.

## Ejecutar en local

```bash
npm install
npm run dev
```

## Qué editar

- **Textos y enlaces:** `src/content.ts`. Todo el contenido del sitio está en ese archivo.
- **Video del proyecto (opcional):** en `proyecto.video` de `src/content.ts` pon el ID de YouTube o la ruta de un mp4 en `public/`. Si ambos están vacíos, no se muestra.
- **Título y descripción para buscadores:** `index.html`.

## Publicar gratis en Vercel

1. Sube este proyecto a un repo nuevo en tu GitHub (por ejemplo `portafolio`).
2. En vercel.com entra con GitHub, elige **Add New → Project** e importa el repo.
3. Vercel detecta Vite solo. Pulsa **Deploy**.
4. Tu sitio queda en una dirección como `portafolio-xxxx.vercel.app`. Puedes cambiar el nombre en Settings → Domains.

## Dominio propio (opcional)

Compra un dominio (.dev, .com o .gt) en cualquier registrador y agrégalo en Vercel → Settings → Domains. Vercel te indica los registros DNS que debes crear.

## Antes de publicar

- Revisa que los enlaces de `src/content.ts` sigan siendo correctos.
- Agrega una imagen para compartir en redes (Open Graph) si quieres una vista previa con imagen.

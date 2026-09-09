# facturador_landing

Sitio público de Ruckia (landing + blog), en Astro y desplegado en Vercel.

## Comandos

```powershell
npm install
npm run dev      # servidor local
npm run build    # genera dist/
npm run preview  # sirve dist/
npm run og       # regenera public/og-default.png
```

## Estructura

- `src/config.ts` — fuente única de verdad: URL del sitio, textos base y datos de
  contacto. **Al comprar el dominio propio solo se cambia `SITE_URL`**: canonical,
  `og:url` y `sitemap.xml` se derivan de ahí.
- `src/layouts/BaseLayout.astro` — `<head>` con SEO, Open Graph y JSON-LD.
- `src/components/` — Header y Footer, compartidos entre landing y blog.
- `src/pages/index.astro` — la landing.
- `public/fonts/` — Inter variable self-host (origen: `@fontsource-variable/inter`).

## Historia

El sitio nació como un único `index.html` de 440 KB exportado desde un canvas de
diseño. Ese formato traía tres fallas heredadas, corregidas durante la migración:

1. Las media queries del header no aplicaban, porque el export emitía los estilos
   inline y estos ganan a la hoja de estilos.
2. Los SVG usaban `sc-camel-view-box` en vez de `viewBox`, así que los iconos se
   renderizaban recortados.
3. Los estados hover se emitían como `style-hover`, un atributo que ningún
   navegador interpreta: estaban todos muertos.

El canvas ya no es la fuente de verdad; este repositorio sí.

## Blog (Sanity)

El contenido vive en Sanity (proyecto `facturador_ruckia`, id `2veu0c14`,
dataset `production`) y el sitio se genera estático en cada publicación.

- `studio/` — el Sanity Studio. Es un proyecto aparte: **no forma parte del
  build de Astro** ni se monta en ninguna ruta del sitio. Vive aquí para que el
  esquema quede versionado junto al sitio que lo consume.
- `src/lib/sanity.ts` — cliente y consultas GROQ.
- `src/lib/portableText.ts` — convierte el contenido a HTML **en build**, para
  que el artículo le llegue ya renderizado al crawler.

### Publicar el Studio

```powershell
cd studio
npm install
npm run login    # abre el navegador
npm run deploy   # publica en https://facturador-ruckia.sanity.studio
```

### Republicación automática

Falta conectar el webhook para que publicar un artículo redespliegue el sitio:

1. En Vercel: *Settings → Git → Deploy Hooks*, crear uno sobre la rama de
   producción y copiar la URL.
2. En Sanity: *API → Webhooks → Create webhook*, pegar esa URL, método `POST`,
   dataset `production`, filtro `_type == "post"`, disparadores create/update/delete.

Sin ese webhook el blog funciona igual, pero los artículos nuevos solo aparecen
en el siguiente despliegue.

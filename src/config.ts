// Fuente unica de verdad del sitio.
// Al comprar el dominio propio basta con cambiar SITE_URL: canonical, og:url
// y sitemap.xml se derivan todos de aqui.
export const SITE_URL = 'https://facturador-landing.vercel.app';

export const SITE_NAME = 'Ruckia';
export const SITE_TITLE = 'Ruckia — Facturación electrónica para tu MYPE en Perú';
export const SITE_DESCRIPTION =
  'Emite tus facturas y boletas sin dolores de cabeza con SUNAT. Ruckia se encarga ' +
  'de la parte técnica y legal para micro y pequeños negocios en Perú.';

// Valores que en el bundle original vivian como props del canvas.
export const WHATSAPP_NUMBER = '51973229360';
export const WHATSAPP_MESSAGE =
  'Hola Ruckia, quiero emitir mis facturas y boletas sin complicarme con SUNAT.';
export const waHref =
  'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);

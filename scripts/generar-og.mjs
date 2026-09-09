// Genera la imagen de preview social por defecto (1200x630).
// Se versiona el script y no solo el PNG para poder regenerarla si cambia la
// marca o el mensaje: npm run og
import sharp from 'sharp';

const F = 'Segoe UI, Inter, Arial, Helvetica, sans-serif';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#6C63FF"/>
  <circle cx="1080" cy="90" r="260" fill="#7A72FF" opacity="0.55"/>
  <circle cx="130" cy="600" r="200" fill="#5A51E8" opacity="0.45"/>
  <g transform="translate(88,74) scale(2.1)">
    <path d="M4.6 2h9.1L21 9.3v11.1c0 .9-.7 1.6-1.6 1.6H4.6c-.9 0-1.6-.7-1.6-1.6V3.6C3 2.7 3.7 2 4.6 2Z" fill="#ffffff"/>
    <path d="M13.7 2 21 9.3h-5.7c-.9 0-1.6-.7-1.6-1.6V2Z" fill="#B9B4FF"/>
  </g>
  <text x="152" y="122" font-family="${F}" font-size="46" font-weight="800" fill="#ffffff" letter-spacing="-1.4">ruckia</text>
  <text x="88" y="292" font-family="${F}" font-size="70" font-weight="800" fill="#ffffff" letter-spacing="-2.4">Facturación electrónica</text>
  <text x="88" y="376" font-family="${F}" font-size="70" font-weight="800" fill="#ffffff" letter-spacing="-2.4">para tu MYPE en Perú</text>
  <text x="88" y="452" font-family="${F}" font-size="31" font-weight="400" fill="#E4E1FF">Emite tus facturas y boletas sin dolores de cabeza con SUNAT.</text>
  <rect x="88" y="508" width="330" height="64" rx="14" fill="#ffffff"/>
  <text x="253" y="549" font-family="${F}" font-size="25" font-weight="700" fill="#5A51E8" text-anchor="middle">Escríbenos por WhatsApp</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-default.png');
const m = await sharp('public/og-default.png').metadata();
console.log('public/og-default.png', `${m.width}x${m.height}`);

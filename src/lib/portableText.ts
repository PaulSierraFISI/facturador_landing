import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import { urlDeImagen, type SanityImage } from './sanity';

/**
 * Convierte el contenido de Sanity a HTML. Se hace en build, no en el
 * navegador, para que el articulo llegue al crawler ya renderizado.
 */
export function renderizarCuerpo(bloques: PortableTextBlock[]): string {
  return toHTML(bloques, {
    components: {
      types: {
        image: ({ value }: { value: SanityImage }) => {
          const src = urlDeImagen(value).width(1440).fit('max').auto('format').url();
          const alt = escapar(value.alt ?? '');
          const pie = value.caption
            ? '<figcaption>' + escapar(value.caption) + '</figcaption>'
            : '';
          return '<figure><img src="' + src + '" alt="' + alt + '" loading="lazy">' + pie + '</figure>';
        },
      },
      marks: {
        link: ({ value, children }: { value?: { href?: string }; children: string }) => {
          const href = value?.href ?? '';
          // Los enlaces externos se abren aparte y sin pasar referencia.
          const externo = /^https?:/.test(href) && !href.includes('ruckia');
          const extra = externo ? ' target="_blank" rel="noopener noreferrer"' : '';
          return '<a href="' + escapar(href) + '"' + extra + '>' + children + '</a>';
        },
      },
    },
  });
}

function escapar(t: string): string {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

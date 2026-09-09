import { defineField, defineType } from 'sanity';

// Los textos van en espanol porque quien publica es el equipo de contenido,
// no un desarrollador. Los campos obligatorios son exactamente los que el
// sitio necesita para renderizar el articulo y su tarjeta de preview social.
export const post = defineType({
  name: 'post',
  title: 'Articulo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      description: 'El titular del articulo. Es lo que se ve en Google y al compartirlo.',
      validation: (Rule) => Rule.required().min(15).max(90).warning('Entre 15 y 90 caracteres rinde mejor en Google.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Se genera sola desde el titulo. Una vez publicado, evita cambiarla: rompe los enlaces ya compartidos.',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      description: 'Dos o tres lineas. Se usa en el listado del blog y como descripcion al compartir el enlace.',
      validation: (Rule) => Rule.required().min(50).max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      description: 'Obligatoria: es la imagen que aparece al compartir el articulo en WhatsApp, Facebook o LinkedIn. Ideal 1200x630.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen para quien no puede verla. Tambien suma en SEO.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicacion',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'Equipo Ruckia',
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Parrafo', value: 'normal' },
            { title: 'Subtitulo', value: 'h2' },
            { title: 'Sub-subtitulo', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          lists: [
            { title: 'Vinetas', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Direccion',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
            defineField({ name: 'caption', title: 'Pie de foto', type: 'string' }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titulo para Google (opcional)',
      type: 'string',
      description: 'Solo si quieres que Google muestre un titulo distinto al del articulo.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripcion para Google (opcional)',
      type: 'text',
      rows: 2,
      description: 'Solo si quieres una descripcion distinta al resumen.',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Mas recientes primero',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      const fecha = subtitle
        ? new Date(subtitle).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'sin fecha';
      return { title, subtitle: fecha, media };
    },
  },
});

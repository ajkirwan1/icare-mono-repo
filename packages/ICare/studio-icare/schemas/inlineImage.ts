import { defineType, defineField } from 'sanity'

export const inlineImage = defineType({
  name: 'inlineImage',
  title: 'Image (with caption)',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Full width', value: 'full' },
          { title: 'Wide (centered)', value: 'wide' },
          { title: 'Centered', value: 'center' },
          { title: 'Wrap left', value: 'left' },
          { title: 'Wrap right', value: 'right' },
        ],
      },
      initialValue: 'wide',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'caption' },
    prepare({ media, title }) {
      return { media, title: title || 'Image' }
    },
  },
})

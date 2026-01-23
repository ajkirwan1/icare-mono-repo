import { defineType, defineField } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: { list: ['primary', 'secondary'] },
      initialValue: 'primary',
    }),
    defineField({
      name: 'newTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'href' },
    prepare({ title, subtitle }) {
      return { title: title || 'CTA Button', subtitle }
    },
  },
})

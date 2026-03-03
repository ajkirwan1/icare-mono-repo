import {defineField, defineType} from 'sanity'

export const careerProfile = defineType({
  name: 'careerProfile',
  title: 'Career Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Example: London and nearby areas',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower number appears first',
      initialValue: 100,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'jobTitle',
      media: 'photo',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Unnamed profile',
        subtitle: subtitle || 'No job title',
        media,
      }
    },
  },
})

import { defineField, defineType } from "sanity";

export const homeFeaturedCarer = defineType({
  name: "homeFeaturedCarer",
  title: "Home Featured Carer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Example: London and nearby areas",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsAppNumber",
      title: "WhatsApp number",
      type: "string",
      description: "Digits only, with country code, e.g. 447448016876",
      initialValue: "447448016876",
    }),
    defineField({
      name: "whatsAppMessage",
      title: "WhatsApp prefilled message",
      type: "string",
      description: "Optional custom message. If empty, app builds one automatically.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower number appears first in the slider",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location",
      media: "photo",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || "Unnamed carer",
        subtitle: subtitle || "No location",
        media,
      };
    },
  },
});

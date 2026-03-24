import { defineField, defineType } from "sanity";

const YOUTUBE_URL_PATTERN =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[\w-]{11}([&?][^#\s]*)?|youtu\.be\/[\w-]{11}([?][^#\s]*)?)$/i;

export const youtubeEmbed = defineType({
  name: "youtubeEmbed",
  title: "YouTube Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) {
            return "YouTube URL is required";
          }

          return YOUTUBE_URL_PATTERN.test(value)
            ? true
            : "Enter a valid YouTube watch or share URL";
        }),
    }),
    defineField({
      name: "title",
      title: "Embed title",
      type: "string",
      description: "Used for accessibility in the embedded player.",
      initialValue: "Embedded YouTube video",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "url" },
    prepare({ title, subtitle }) {
      return {
        title: title || "YouTube Embed",
        subtitle,
      };
    },
  },
});

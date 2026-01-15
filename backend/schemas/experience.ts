import { Rule } from "@sanity/types/dist/dts";

export default {
  name: "experience",
  title: "Work Experience",
  type: "document",
  fields: [
    {
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role/Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if currently working here",
    },
    {
      name: "current",
      title: "Current Position",
      type: "boolean",
      description: "Check if this is your current position",
      initialValue: false,
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Key responsibilities and achievements",
    },
    {
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      description: "List of technologies, tools, and frameworks used",
    },
    {
      name: "companyUrl",
      title: "Company Website",
      type: "url",
    },
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (0 = most recent)",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Start Date, New",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "role",
      subtitle: "company",
      media: "logo",
      current: "current",
    },
    prepare(selection: any) {
      const { title, subtitle, media, current } = selection;
      return {
        title: `${title}${current ? " (Current)" : ""}`,
        subtitle,
        media,
      };
    },
  },
};

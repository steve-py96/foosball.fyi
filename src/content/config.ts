import { z, defineCollection } from 'astro:content';

const generalPageSchema = z.object({
  name: z.string(),
});

// every location has to provide a frontmatter config with these values
const locations = defineCollection({
  type: 'content',
});

const general = defineCollection({
  type: 'content',
  schema: generalPageSchema,
});

export const collections = { locations, general };
export type GeneralPageDataSchema = z.infer<typeof generalPageSchema>;

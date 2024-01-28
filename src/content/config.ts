import { z, defineCollection } from 'astro:content';

const generalLocationSchema = z.object({
  name: z.string().optional(),
});

const generalPageSchema = z.object({
  name: z.string(),
});

// every location has to provide a frontmatter config with these values
const locations = defineCollection({
  type: 'content',
  schema: generalLocationSchema,
});

const general = defineCollection({
  type: 'content',
  schema: generalPageSchema,
});

export const collections = { locations, general };
export type GeneralPageDataSchema = z.infer<typeof generalPageSchema>;
export type GeneralLocationDataSchema = z.infer<typeof generalLocationSchema>;

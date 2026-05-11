import { defineCollection, z } from "astro:content";

const oppgaver = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    fag: z.enum(["driftsstotte", "brukerstotte", "utvikling"]),
    emne: z.string(),
    kompetansemaal: z.array(z.string()),
    vanskelighetsgrad: z.enum(["nybegynner", "middels", "avansert"]),
    vurdering: z.string().optional(),
    varighet: z.string().optional(),
    publisert: z.boolean().default(true),
    dato: z.coerce.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { oppgaver };

import { z } from "zod";

export const CaptionModel = z.object({
  id: z.string().min(1),
  topic: z.string(),
  content: z.string(),
  phoneUser: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CaptionModel = z.infer<typeof CaptionModel>;

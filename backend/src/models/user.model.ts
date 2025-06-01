import { z } from "zod";

export const UserModel = z.object({
  id: z.string().min(1),
  phoneNumber: z.string().min(1).max(13),
  accessCode: z.object({
    code: z.number().min(100000).max(999999),
    expiresAt: z.date(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserModel = z.infer<typeof UserModel>;

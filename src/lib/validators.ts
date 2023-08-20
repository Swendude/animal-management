import { z } from "zod";

export const AnimalValidator = z.object({
  id: z.number().int(),
  name: z.string(),
  age: z.number().int(),
  kind: z.union([
    z.literal("cow"),
    z.literal("chicken"),
    z.literal("pig"),
    z.literal("sheep"),
  ]),
  hasBeenFed: z.boolean(),
  imgUrl: z.string().url(),
});

export type Animal = z.infer<typeof AnimalValidator>;

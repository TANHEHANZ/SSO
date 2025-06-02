import { z } from 'zod';

export const ListServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  options: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        icon: z.string(),
        description: z.string(),
        metods: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              icon: z.string(),
              description: z.string(),
            })
          )
          .optional(),
      })
    )
    .optional(),
});
export type ListServiceDTO = z.infer<typeof ListServiceSchema>;

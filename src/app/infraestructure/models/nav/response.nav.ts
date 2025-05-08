import { z } from 'zod';

const NavItemSchema: z.ZodType<any> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  icon: z.string(),
  color: z.string().nullable(),
  parentId: z.string().nullable(),
  children: z.array(z.lazy(() => NavItemSchema)).optional(),
});

export const NavResponseSchema: z.ZodType<any> = z.array(NavItemSchema);
export type NavResponseDTO = z.infer<typeof NavResponseSchema>;

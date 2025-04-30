import { z } from 'zod';

export const ParamsPaginatedSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(5),
});
export type ParamsPaginatedDTO = z.infer<typeof ParamsPaginatedSchema>;

export const PaginatedResponseSchema = z.object({
  total_count: z.number(),
  total_pages: z.number(),
  items: z.array(z.unknown()),
});
export type PaginatedResponseDTO = z.infer<typeof PaginatedResponseSchema>;

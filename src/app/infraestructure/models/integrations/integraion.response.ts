import { z } from 'zod';

const IntegrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  desription: z.string(),
  icon: z.any(),
});

export type IntegrationDTO = z.infer<typeof IntegrationSchema>;
export type IntegrationResponseDTO = IntegrationDTO[];

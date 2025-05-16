import { z } from 'zod';
import { typeOfInputs } from './configuration.responses';
const OptiosIntegrationServices = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.any(),
});
const IntegrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.any().optional(),
  options: OptiosIntegrationServices.array().optional(),
});

const inputsAutentication = z.object({
  id: z.string(),
  name: z.string(),
  icons: z.string(),
  type: typeOfInputs,
});

// CRETE DTO
export type InputsAutenticationDTO = z.infer<typeof inputsAutentication>;
export type IntegrationDTO = z.infer<typeof IntegrationSchema>;
export type OptiosIntegrationServicesDTO = z.infer<typeof IntegrationSchema>;

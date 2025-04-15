import { z } from 'zod';

export const authResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  auth_method: z.enum(['google', 'github', 'microsoft', 'email', 'ci']),
});

export const queryGoogleSchema = z.object({
  client_id: z.string(),
  redirect_uri: z.string().url(),
});

export type GoogleAuthResponseType = z.infer<typeof authResponseSchema>;
export type QueryGoogleType = z.infer<typeof queryGoogleSchema>;

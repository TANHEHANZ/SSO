import { z } from 'zod';

const ScopeSchema = z.object({
  name: z.string(),
});

const OAuthClientScopePermissionSchema = z.object({
  clientId: z.string().uuid(),
  scopeId: z.string().uuid(),
  scope: ScopeSchema,
});

export const ClientResponseSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string().nullable(),
  client_secret: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  redirect_uris: z.array(z.string().url()),
  webhook_url: z.string().url(),
  domain: z.string(),
  Status: z.enum(['ACTIVE', 'INACTIVE']),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  oAuthClientScopePermission: z.array(OAuthClientScopePermissionSchema),
});

export type ClientResponseDTO = z.infer<typeof ClientResponseSchema>;

export const ClientArrayResponseSchema = z.array(ClientResponseSchema);
export type ClientArrayResponseDTO = z.infer<typeof ClientArrayResponseSchema>;

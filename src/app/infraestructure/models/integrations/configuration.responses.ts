import { z } from 'zod';

export const AuthenticationTypeSchema = z.enum(['interno', 'externo']);
export const typeOfInputs = z.enum(['password', 'email', 'text']);

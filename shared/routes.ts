import { z } from 'zod';
import { insertParticipanteSchema, participantesCarnaval } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  participantes: {
    create: {
      method: 'POST' as const,
      path: '/api/participantes' as const,
      input: insertParticipanteSchema,
      responses: {
        201: z.custom<typeof participantesCarnaval.$inferSelect>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

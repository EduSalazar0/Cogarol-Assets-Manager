import { pgTable, text, serial, date, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const participantesCarnaval = pgTable("participantes_carnaval", {
  id: serial("id").primaryKey(),
  nombreCompleto: text("nombre_completo").notNull(),
  cedula: varchar("cedula", { length: 10 }).notNull(),
  fecha: date("fecha").notNull(),
  telefono: text("telefono").notNull(),
  numeroEntrada: text("numero_entrada").notNull(),
});

// Validation schema
export const insertParticipanteSchema = createInsertSchema(participantesCarnaval, {
  cedula: z.string().length(10, "La cédula debe tener exactamente 10 dígitos").regex(/^\d+$/, "Solo números permitidos"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  numeroEntrada: z.string().min(1, "El número de entrada es requerido"),
});

export type InsertParticipante = z.infer<typeof insertParticipanteSchema>;
export type Participante = typeof participantesCarnaval.$inferSelect;

import { participantesCarnaval, type InsertParticipante, type Participante } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createParticipante(participante: InsertParticipante): Promise<Participante>;
}

export class DatabaseStorage implements IStorage {
  async createParticipante(participante: InsertParticipante): Promise<Participante> {
    const [newParticipante] = await db
      .insert(participantesCarnaval)
      .values(participante)
      .returning();
    return newParticipante;
  }
}

export const storage = new DatabaseStorage();

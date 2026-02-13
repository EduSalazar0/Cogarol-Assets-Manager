import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { insertParticipanteSchema } from "@shared/schema";

// Type definitions based on schema
export type InsertParticipante = z.infer<typeof insertParticipanteSchema>;

export function useCreateParticipante() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertParticipante) => {
      // Validate data against schema before sending
      const validated = api.participantes.create.input.parse(data);
      
      const res = await fetch(api.participantes.create.path, {
        method: api.participantes.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al registrar participante');
      }

      return api.participantes.create.responses[201].parse(await res.json());
    },
    onError: (error: Error) => {
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

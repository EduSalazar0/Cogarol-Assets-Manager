import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertParticipanteSchema } from "@shared/schema";
import { useCreateParticipante, type InsertParticipante } from "@/hooks/use-participantes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoldButton } from "@/components/ui/gold-button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Ticket, User, Phone, Calendar as CalendarIcon, CreditCard, ShieldCheck } from "lucide-react";

// Assets
import logo from "@assets/Logo_Cogarol_1771013016664.png";
import heroImg1 from "@assets/cogarol_1_1771013009283.png";
import heroImg2 from "@assets/cogarol_2_1771013009283.png";
import heroImg3 from "@assets/cogarol_3_1771013009282.png";

export default function LandingPage() {
  const { toast } = useToast();
  const createMutation = useCreateParticipante();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertParticipante>({
    resolver: zodResolver(insertParticipanteSchema),
    defaultValues: {
      nombreCompleto: "",
      cedula: "",
      telefono: "",
      numeroEntrada: "",
      fecha: new Date().toISOString().split('T')[0], // Default to today
    },
  });

  const onSubmit = (data: InsertParticipante) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#191548', '#FFFFFF']
        });
        toast({
          title: "¡Registro Exitoso!",
          description: "Tu participación ha sido registrada correctamente.",
          className: "bg-[#191548] text-white border-[#D4AF37]",
        });
        form.reset();
        
        // Reset success state after a delay to allow new submissions
        setTimeout(() => setIsSuccess(false), 5000);
      },
    });
  };

  return (
    <div className="min-h-screen bg-geometric flex flex-col font-sans text-[#191548]">
      {/* Navbar / Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Cogarol Logo" className="h-12 w-auto" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold leading-none text-[#191548]">COGAROL</h1>
              <p className="text-xs text-[#D4AF37] font-semibold tracking-widest uppercase">Seguridad Privada</p>
            </div>
          </div>
          <a href="#registro" className="text-sm font-semibold text-[#191548] hover:text-[#D4AF37] transition-colors">
            Registrar Ticket
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191548]/5 border border-[#191548]/10 text-[#191548] text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Seguridad de Confianza</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#191548]">
              Seguridad que se siente, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
                Carnaval que se disfruta.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Más de 20 años protegiendo lo que más valoras. Este Carnaval, tu seguridad es nuestra prioridad para que solo te preocupes de celebrar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#registro">
                <GoldButton className="w-full sm:w-auto px-8">
                  PARTICIPAR AHORA
                </GoldButton>
              </a>
              <button className="px-8 py-4 rounded-xl font-bold text-[#191548] bg-white border-2 border-slate-200 hover:border-[#191548] transition-all">
                Conocer Más
              </button>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/20 transform hover:-translate-y-1 transition-transform duration-300">
                  <img src={heroImg1} alt="Seguridad Evento" className="w-full h-48 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/20 transform hover:-translate-y-1 transition-transform duration-300">
                  <img src={heroImg3} alt="Guardias" className="w-full h-64 object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/20 transform hover:-translate-y-1 transition-transform duration-300">
                  <img src={heroImg2} alt="Vigilancia" className="w-full h-64 object-cover" />
                </div>
                <div className="bg-[#191548] p-6 rounded-2xl shadow-xl flex flex-col justify-center items-center text-white text-center">
                  <h3 className="text-3xl font-bold text-[#D4AF37] mb-1">20+</h3>
                  <p className="text-sm font-medium opacity-90">Años de Experiencia</p>
                </div>
              </div>
            </div>
            
            {/* Decorative background blur */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#D4AF37]/20 to-[#191548]/10 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registro" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#191548] via-[#D4AF37] to-[#191548]" />
        
        <div className="max-w-md mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Card Header */}
            <div className="bg-[#191548] p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-xl transform translate-x-10 -translate-y-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#D4AF37]/10 rounded-full blur-lg transform -translate-x-5 translate-y-5" />
              
              <h2 className="text-2xl font-bold text-white relative z-10 font-poppins">Registro de Participante</h2>
              <p className="text-[#D4AF37] text-sm mt-1 relative z-10 font-medium">Ingresa tus datos para ganar</p>
            </div>

            {/* Form */}
            <div className="p-8">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#191548] mb-2">¡Registro Confirmado!</h3>
                  <p className="text-slate-600 mb-8">
                    Mucha suerte. Ya estás participando en el sorteo de Carnaval.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-[#D4AF37] font-bold hover:underline"
                  >
                    Registrar otro ticket
                  </button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    
                    <FormField
                      control={form.control}
                      name="nombreCompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#191548] font-bold flex items-center gap-2">
                            <User className="w-4 h-4 text-[#D4AF37]" /> Nombre Completo
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. Juan Pérez" {...field} className="input-premium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cedula"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#191548] font-bold flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Cédula
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="10 dígitos" maxLength={10} {...field} className="input-premium" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#191548] font-bold flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#D4AF37]" /> Teléfono
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="099..." {...field} className="input-premium" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="numeroEntrada"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#191548] font-bold flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-[#D4AF37]" /> Número de Entrada
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="N° Ticket" {...field} className="input-premium pl-10 border-[#D4AF37]/50 bg-yellow-50/30" />
                              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fecha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#191548] font-bold flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-[#D4AF37]" /> Fecha
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="input-premium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <GoldButton 
                        type="submit" 
                        isLoading={createMutation.isPending}
                        className="shadow-xl"
                      >
                        CANJEAR OPORTUNIDAD
                      </GoldButton>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#191548] text-white py-12 border-t-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert opacity-80" />
              <div>
                <span className="block font-bold tracking-wider">COGAROL</span>
                <span className="text-xs text-[#D4AF37] uppercase">Seguridad Integral</span>
              </div>
            </div>
            
            <div className="text-sm text-slate-300 text-center md:text-right">
              <p>&copy; 2026 Cogarol Cía. Ltda. Todos los derechos reservados.</p>
              <p className="mt-1 text-xs opacity-60">Desarrollado para el evento de Carnaval 2026.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

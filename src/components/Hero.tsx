import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-eudora p-6">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Promoção Exclusiva
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Responda 5 Perguntas e Ganhe um KIT Completo da Eudora!
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Participe agora e descubra seu presente exclusivo.
          </p>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="hero" 
            size="xl"
            onClick={onStart}
            className="animate-pulse-soft"
          >
            Quero Participar
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-white/70 text-sm max-w-md mx-auto">
            Esta é uma promoção independente, não patrocinada pela Eudora, salvo acordo em contrário.
          </p>
        </div>
      </div>
    </div>
  );
};

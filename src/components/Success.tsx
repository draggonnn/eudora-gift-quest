import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Package } from "lucide-react";

interface SuccessProps {
  orderNumber: string;
}

export const Success = ({ orderNumber }: SuccessProps) => {
  return (
    <div className="min-h-screen gradient-eudora p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 text-center animate-fade-in-up">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-eudora rounded-full flex items-center justify-center mb-4 animate-pulse-soft">
              <CheckCircle2 className="w-14 h-14 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Pedido confirmado!
            </h2>
            <p className="text-xl text-muted-foreground">
              Seu kit está a caminho 🎉
            </p>
          </div>

          <div className="bg-gradient-eudora-light rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Package className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Número do pedido</p>
                <p className="text-2xl font-bold text-foreground">#{orderNumber}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left bg-muted/30 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Próximos passos</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Você receberá um e-mail de confirmação em instantes</li>
                  <li>✓ O código de rastreio será enviado assim que o kit for despachado</li>
                  <li>✓ Prazo de entrega: 7-15 dias úteis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.reload()}
            >
              Voltar ao início
            </Button>
          </div>
        </div>

        <p className="text-center text-white/70 text-sm mt-6">
          Esta é uma promoção independente, não patrocinada pela Eudora.
        </p>
      </div>
    </div>
  );
};

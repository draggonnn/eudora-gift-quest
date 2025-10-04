import { Button } from "@/components/ui/button";
import { ChevronLeft, Package, Truck } from "lucide-react";

interface CheckoutProps {
  onConfirm: () => void;
  onBack: () => void;
}

export const Checkout = ({ onConfirm, onBack }: CheckoutProps) => {
  const kitItems = [
    "Perfume Eudora (50ml)",
    "Batom Matte",
    "Sérum Facial",
    "Creme Hidratante Corporal",
    "Máscara de Cílios",
  ];

  return (
    <div className="min-h-screen gradient-eudora-light p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 animate-fade-in-up">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto gradient-eudora rounded-full flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tudo certo!
            </h2>
            <p className="text-muted-foreground text-lg">
              Para confirmar o envio do seu kit, é cobrada uma taxa simbólica de envio e manuseio.
            </p>
          </div>

          <div className="bg-gradient-eudora-light rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Package className="w-5 h-5" />
              Seu Kit Eudora inclui:
            </h3>
            <ul className="space-y-2">
              {kitItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-primary rounded-2xl p-6 text-center space-y-2 bg-white">
            <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
              Taxa de envio e manuseio
            </p>
            <p className="text-5xl font-bold text-primary">
              R$ 23,90
            </p>
            <p className="text-muted-foreground text-sm">
              Pagamento único
            </p>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
            <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Informações de entrega</p>
              <p>Taxa única para cobrir custos de transporte.</p>
              <p>Entrega estimada em 7-15 dias úteis.</p>
            </div>
          </div>

          <Button 
            onClick={onConfirm} 
            variant="default" 
            size="xl" 
            className="w-full"
          >
            Confirmar e Concluir Envio
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Esta é uma promoção independente, não patrocinada pela Eudora.
        </p>
      </div>
    </div>
  );
};

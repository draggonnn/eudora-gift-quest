import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  onBack: () => void;
}

export interface LeadFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  agreedToTerms: boolean;
}

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) return false;
  
  // Validação básica de CPF
  if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
  return true;
};

export const LeadForm = ({ onSubmit, onBack }: LeadFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
    },
    agreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCPF(formData.cpf)) {
      toast.error("CPF inválido. Verifique e tente novamente.");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("Você precisa aceitar os termos da promoção.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="min-h-screen gradient-eudora-light p-6 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 animate-fade-in-up">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-gradient-eudora-light px-4 py-2 rounded-full text-primary text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              Parabéns!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Seu kit está reservado
            </h2>
            <p className="text-muted-foreground text-lg">
              Agora precisamos do seu endereço para enviar seu presente.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Digite seu nome completo"
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    required
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Celular *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="mt-1"
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Endereço de entrega</h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Rua *</Label>
                      <Input
                        id="street"
                        required
                        value={formData.address.street}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, street: e.target.value }
                        })}
                        placeholder="Nome da rua"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        required
                        value={formData.address.number}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, number: e.target.value }
                        })}
                        placeholder="Nº"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      value={formData.address.complement}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, complement: e.target.value }
                      })}
                      placeholder="Apto, bloco, etc (opcional)"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        required
                        value={formData.address.neighborhood}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, neighborhood: e.target.value }
                        })}
                        placeholder="Bairro"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        required
                        value={formData.address.cep}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, cep: formatCEP(e.target.value) }
                        })}
                        placeholder="00000-000"
                        maxLength={9}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.address.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, city: e.target.value }
                        })}
                        placeholder="Cidade"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        required
                        value={formData.address.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, state: e.target.value.toUpperCase() }
                        })}
                        placeholder="UF"
                        maxLength={2}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreedToTerms: checked as boolean })
                  }
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Confirmo que li e aceito os termos da promoção. *
                </label>
              </div>
            </div>

            <Button type="submit" variant="default" size="xl" className="w-full">
              Continuar
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Esta é uma promoção independente, não patrocinada pela Eudora.
        </p>
      </div>
    </div>
  );
};

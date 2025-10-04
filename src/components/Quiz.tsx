import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { ChevronLeft } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuizProps {
  onComplete: (answers: Record<number, string>) => void;
  onBack: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Você já usa produtos Eudora?",
    options: ["Sim", "Não"],
  },
  {
    id: 2,
    question: "Qual sua faixa etária?",
    options: ["18-24", "25-34", "35-44", "45+"],
  },
  {
    id: 3,
    question: "Qual categoria mais te interessa?",
    options: ["Perfumes", "Maquiagem", "Cuidados com a pele", "Corpo e banho"],
  },
  {
    id: 4,
    question: "Com que frequência compra produtos de beleza?",
    options: ["Semanal", "Mensal", "A cada 2-3 meses", "Raramente"],
  },
  {
    id: 5,
    question: "Onde você conheceu a Eudora?",
    options: ["Instagram", "Facebook", "Indicação", "Outro"],
  },
];

export const Quiz = ({ onComplete, onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onComplete(newAnswers);
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen gradient-eudora-light p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 animate-slide-in">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <ProgressBar current={currentQuestion + 1} total={questions.length} />

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {question.question}
            </h2>

            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="quiz"
                  onClick={() => handleAnswer(option)}
                  className="w-full justify-start text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Esta é uma promoção independente, não patrocinada pela Eudora.
        </p>
      </div>
    </div>
  );
};

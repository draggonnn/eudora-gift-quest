import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { LeadForm, LeadFormData } from "@/components/LeadForm";
import { Checkout } from "@/components/Checkout";
import { Success } from "@/components/Success";

type Step = "hero" | "quiz" | "form" | "checkout" | "success";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [orderNumber, setOrderNumber] = useState("");

  const generateOrderNumber = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleQuizComplete = (answers: Record<number, string>) => {
    setQuizAnswers(answers);
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: LeadFormData) => {
    setLeadData(data);
    setCurrentStep("checkout");
  };

  const handleCheckoutConfirm = () => {
    const order = generateOrderNumber();
    setOrderNumber(order);
    setCurrentStep("success");
    
    // Aqui você pode enviar os dados para sua API/backend
    console.log("Quiz Answers:", quizAnswers);
    console.log("Lead Data:", leadData);
    console.log("Order Number:", order);
  };

  return (
    <>
      {currentStep === "hero" && (
        <Hero onStart={() => setCurrentStep("quiz")} />
      )}

      {currentStep === "quiz" && (
        <Quiz 
          onComplete={handleQuizComplete}
          onBack={() => setCurrentStep("hero")}
        />
      )}

      {currentStep === "form" && (
        <LeadForm 
          onSubmit={handleFormSubmit}
          onBack={() => setCurrentStep("quiz")}
        />
      )}

      {currentStep === "checkout" && (
        <Checkout 
          onConfirm={handleCheckoutConfirm}
          onBack={() => setCurrentStep("form")}
        />
      )}

      {currentStep === "success" && (
        <Success orderNumber={orderNumber} />
      )}
    </>
  );
};

export default Index;

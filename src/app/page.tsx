"use client";

import Button from "@/components/Button";
import FeedbackCard from "@/components/FeedbackCard";
import { getQuestions } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/images/logo.webp";

const StartScreen = ({onStartClick}: { onStartClick: () => void }) => {
  return (
    <div className="flex flex-col sm:items-center justify-center h-screen px-5 sm:text-center">
      <Image
        src={Logo}
        alt="logo"
        width={200}
        height={200}
        className="rounded my-3"
        priority={true}
      />
      <h1 className="text-4xl font-bold mb-6">
        Velkommen til klasse B kontrollspørsmål quiz!
      </h1>
      <p className="text-lg mb-8">
        Trenger du å trene på kontrollspørsmålene til klasse B førerkort? Da er
        dette quizzen for deg!
      </p>
      <Button onClick={onStartClick}>Start quiz</Button>
    </div>
  );
};

const EndScreen = ({onRestartClick}: { onRestartClick: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Takk for at du spilte!</h1>
      <Button onClick={onRestartClick}>Start på nytt</Button>
    </div>
  );
};

const Question = ({
  category,
  question,
  options,
  correctAnswer,
  handleNextQuestion,
}: {
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  handleNextQuestion: () => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    handleNextQuestion();
  };

  return (
    <div className="max-w-7xl mx-auto px-5 my-2">
      <div className="flex flex-col h-screen justify-center sm:items-center">
        <h1 className="text-2xl font-bold mt-6 mb-4 sm:text-center">
          {question}
        </h1>

        <p className="pb-5 text-sm text-gray-200 font-medium">
          Kategori: {category}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showFeedback}
              className="relative flex md:items-center space-x-3 rounded-lg bg-blue-600 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 w-full flex-1">
                <div className="text-gray-100 text-center font-bold">
                  {option}
                </div>
              </div>
            </button>
          ))}
        </div>
        {showFeedback && (
          <>
            <FeedbackCard
              selectedOption={selectedOption}
              correctAnswer={correctAnswer}
              handleNextClick={handleNextClick}
            />
            <Button onClick={handleNextClick}>Neste spørsmål</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleStartClick = () => {
    setGameStarted(true);
  };

  const questions = getQuestions();
  questions.sort(() => Math.random() - 0.5);

  return (
    <div>
      {!gameStarted ? (
        <StartScreen onStartClick={handleStartClick}/>
      ) : currentQuestionIndex < questions.length ? (
        <Question
          category={questions[currentQuestionIndex].category}
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          correctAnswer={questions[currentQuestionIndex].correctAnswer}
          handleNextQuestion={handleOptionClick}
        />
      ) : (
        <EndScreen onRestartClick={() => window.location.reload()}/>
      )}
    </div>
  );
}

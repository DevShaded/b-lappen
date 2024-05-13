"use client";

import Button from "@/components/Button";
import FeedbackCard from "@/components/FeedbackCard";
import { getQuestions } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/images/logo.webp";
import clsx from "clsx";

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
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    handleNextQuestion();
  };

  useEffect(() => {
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
  }, [options, question]);

  return (
    <div className="max-w-7xl mx-auto px-5 my-2">
      <div className="flex flex-col sm:h-screen justify-center">
        <header className="mb-6 sm:text-center">
          <h1 className="text-2xl font-bold mt-6 mb-4 sm:text-center md:text-4xl">
            {question}
          </h1>

          <p className="pb-5 text-gray-200 font-medium md:text-xl">
            Kategori: {category}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 space-6 md:grid-cols-2">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showFeedback}
              className={clsx(
                'col-span-2 md:items-center space-x-3 rounded-lg px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400',
                selectedOption === option && correctAnswer === option ? 'bg-green-500' : '',
                selectedOption === option && correctAnswer !== option ? 'bg-red-500' : '',
                showFeedback && selectedOption === option && correctAnswer === option ? 'disabled' : 'disabled:opacity-50',
                'bg-gray-800'
              )}
            >
              <div className="text-white text-center font-medium">
                {option}
              </div>
            </button>
          ))}

        </div>
        {showFeedback && (
          <div className="mb-16">
            <FeedbackCard
              selectedOption={selectedOption}
              correctAnswer={correctAnswer}
              handleNextClick={handleNextClick}
            />
            <div className="flex justify-end">
              <Button onClick={handleNextClick}>Neste spørsmål</Button>
            </div>
          </div>
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

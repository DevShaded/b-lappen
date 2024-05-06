import { ReactNode } from "react";

function Card({
  success,
  children,
}: {
  success: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-md p-4 ${success ? "bg-green-50" : "bg-white"}`}>
      {children}
    </div>
  );
}

export default function FeedbackCard({
  selectedOption,
  correctAnswer,
  handleNextClick,
}: {
  selectedOption: string | null;
  correctAnswer: string;
  handleNextClick: () => void;
}) {
  return (
    <div className="pt-8">
      <Card success={selectedOption === correctAnswer}>
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-xl font-medium text-gray-800">
              {selectedOption === correctAnswer ? "Riktig svar!" : "Feil svar!"}
            </h3>
            <div className="mt-2 text-gray-700">
              <p className="font-medium">
                {selectedOption === correctAnswer
                  ? "Du har svart riktig på dette spørsmålet!"
                  : "Du har desverre svar feil på dette spørsmålet... Dette er det riktige svaret!"}
              </p>
              {selectedOption !== correctAnswer && (
                <ul role="list" className="list-disc space-y-1 pl-5">
                  <li>{correctAnswer}</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

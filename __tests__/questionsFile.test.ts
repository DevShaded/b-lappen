import { describe, test, expect } from "@jest/globals";
import { getQuestions } from "@/lib/utils";

describe('Check for duplicate questions', () => {
  test('No duplicate questions', () => {
    const questions = getQuestions();
    const questionSet = new Set();
    let duplicateFound = false;

    questions.forEach((question, index) => {
      const { question: currentQuestion } = question;
      if (questionSet.has(currentQuestion)) {
        console.error(`Duplicate question found at index ${index}: ${currentQuestion}`);
        duplicateFound = true;
      } else {
        questionSet.add(currentQuestion);
      }
    });

    expect(duplicateFound).toBe(false);
  });
});

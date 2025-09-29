import { useState, useCallback } from "react";
import {
  DUMMY_ASSESSMENT_RESULT,
  DUMMY_CAREER_RESULT,
  DUMMY_QUIZ_QUESTIONS,
} from "../constants/mockData";

interface UseGeminiProps {
  systemPrompt: string;
  responseSchema: any;
  isGrounded?: boolean;
}

export const useGemini = ({
  systemPrompt,
  responseSchema,
  isGrounded = false,
}: UseGeminiProps) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (userQuery: string): Promise<any | null> => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        // Simulate API delay
        await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1500));
        
        // Mock responses depending on the system prompt
        if (systemPrompt.includes("Skill Analyst")) {
          setData(DUMMY_ASSESSMENT_RESULT);
          return DUMMY_ASSESSMENT_RESULT;
        } else if (systemPrompt.includes("Career Path")) {
          setData(DUMMY_CAREER_RESULT);
          return DUMMY_CAREER_RESULT;
        } else if (systemPrompt.includes("Quiz Generator")) {
          setData(DUMMY_QUIZ_QUESTIONS);
          return DUMMY_QUIZ_QUESTIONS;
        }

        // Default response
        setData({ message: "No specific handler found for this prompt" });
        return { message: "No specific handler found for this prompt" };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [systemPrompt, responseSchema, isGrounded]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, run, reset };
};

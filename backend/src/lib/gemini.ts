import { GoogleGenerativeAI } from "@google/generative-ai";

// Reads the key at call-time (not import-time) so a missing .env produces
// a clear error message instead of a silent undefined client.
function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error(
      "GEMINI_API_KEY is missing. Add it to backend/.env (copy from .env.example)."
    );
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
}

/**
 * Sends a prompt to Gemini 2.5 Flash and returns the parsed JSON response.
 * We force JSON output mode (responseMimeType) so we never have to regex
 * a JSON blob out of a chatty text response.
 */
export async function askGeminiForJSON<T>(prompt: string): Promise<T> {
  const model = getModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as T;
}

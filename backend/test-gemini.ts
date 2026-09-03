import { askGeminiForJSON } from './src/lib/gemini';
import * as dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    console.log("Testing askGeminiForJSON with gemini-3.5-flash-lite...");
    const result = await askGeminiForJSON("{\"prompt\": \"Give me a JSON object with a single key 'status' and value 'ok'\"}");
    console.log("Result:", result);
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

test();

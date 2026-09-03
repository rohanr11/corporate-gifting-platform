import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key found.");
  process.exit(1);
}

// In @google/generative-ai, there's no listModels? Let's try calling an API directly.
// Wait, the error suggests calling ModelService.ListModels.
// Let's do a fetch request.
async function listModels() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();
  console.log(JSON.stringify(data.models.map((m: any) => m.name), null, 2));
}

listModels().catch(console.error);

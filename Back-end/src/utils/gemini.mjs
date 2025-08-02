import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const REFLECTION_PROMPT = process.env.REFLECTION_PROMPT;
function injectPrompt(template, replacements) {
  let injected = template;
  for (const key in replacements) {
    const pattern = new RegExp(`{{${key}}}`, "g");
    injected = injected.replace(pattern, replacements[key]);
  }
  return injected;
}

async function generateResponse(userQuery, lockedMessageContent, conversationHistory = []) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let convo = "";
    if (conversationHistory && conversationHistory.length > 0) {
      convo = "\n**Previous conversation:**\n";
      conversationHistory.forEach((msg) => {
        if (msg.type === "user") {
          convo += `User: ${msg.content}\n`;
        } else if (msg.type === "ai") {
          convo += `You (EchoVault): ${msg.content}\n`;
        }
      });
      convo += "\n**Current conversation continues:**\n";
    }

    const basePrompt = REFLECTION_PROMPT.replace(/\\n/g, "\n");

    const fullPrompt = injectPrompt(basePrompt, {
      lockedMessageContent,
      conversation: convo,
      userQuery,
    });

    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch (error) {
    ("Gemini API error:", error);
    throw error;
  }
}

export { generateResponse };

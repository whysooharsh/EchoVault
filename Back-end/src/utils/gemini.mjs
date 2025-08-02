import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

async function generateResponse(userQuery, lockedMessageContent, conversationHistory = []) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let convo = "";
    if (conversationHistory && conversationHistory.length > 0) {
      convo = "\n**Previous conversation:**\n";
      conversationHistory.forEach((msg, index) => {
        if (msg.type === "user") {
          convo += `User: ${msg.content}\n`;
        } else if (msg.type === "ai") {
          convo += `You (EchoVault): ${msg.content}\n`;
        }
      });
      convo += "\n**Current conversation continues:**\n";
    }

    const fullPrompt = `You are EchoVault, a helpful assistant that helps users reflect on and discuss messages they wrote to their future selves. You have access to a message that the user wrote in the past, and now they want to chat about it.

🔒 **The message from their past self:**
"""
${lockedMessageContent}
"""
${convo}
**Your role:**
- Act as a supportive companion helping them reflect on their past goals and thoughts
- Remember and reference previous parts of this conversation to maintain continuity
- Answer questions about the message content, provide encouragement, and offer insights
- Help them analyze their progress, set new goals, or reflect on their journey
- Be conversational, empathetic, and motivating
- Reference specific parts of their message when relevant
- Build upon previous conversation points naturally
- If they ask about something completely unrelated to their message, gently redirect them back to discussing their past message

**Current user question/message:**
"${userQuery}"

**Instructions:**
- Be warm, encouraging, and personal in your response
- Reference their specific message content when answering
- Remember what you've discussed before in this conversation
- Help them reflect on their goals and progress
- Ask thoughtful follow-up questions to encourage deeper reflection
- If they're asking about their progress, acknowledge what they wrote and encourage them
- Keep responses conversational and supportive, not robotic
- Maintain conversation flow and context from previous messages

Respond as their supportive reflection companion:`;

    const result = await model.generateContent(fullPrompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

export { generateResponse };
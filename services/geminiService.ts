import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ChatMessage, MessageRole, GroundingLink } from "../types";

// Initialize Gemini
// NOTE: API Key is assumed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string,
  language: string = 'English'
): Promise<{ text: string; groundingLinks: GroundingLink[] }> => {
  try {
    // Construct chat history for the model
    // We limit history to the last 10 messages to keep context relevant and save tokens
    const recentHistory = history.slice(-10).map((msg) => ({
      role: msg.role === MessageRole.USER ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION(language),
        tools: [{ googleMaps: {} }], // Enable Maps Grounding
      },
      history: recentHistory,
    });

    const response = await chat.sendMessage({ message: newMessage });
    
    // Extract text
    const text = response.text || "I'm sorry, I couldn't generate a response.";

    // Extract Grounding Chunks (Maps URLs)
    const groundingLinks: GroundingLink[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps?.uri) {
          groundingLinks.push({
            title: chunk.maps.title || "View on Google Maps",
            uri: chunk.maps.uri,
            sourceType: 'maps'
          });
        } else if (chunk.web?.uri) {
           groundingLinks.push({
            title: chunk.web.title || "Source",
            uri: chunk.web.uri,
            sourceType: 'web'
          });
        }
      });
    }

    return { text, groundingLinks };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "Sorry, I'm having trouble connecting to the travel guide service right now. Please try again later.", 
      groundingLinks: [] 
    };
  }
};

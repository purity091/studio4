
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;

if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
  console.warn("API Key is missing or using placeholder in .env. AI features will not work.");
}

const ai = (apiKey && apiKey !== 'PLACEHOLDER_API_KEY') ? new GoogleGenAI(apiKey) : null;

export async function generateSlideContent(topic: string) {
  if (!ai) {
    console.error("AI service is not initialized: API Key missing.");
    return null;
  }
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate an infographic slide content in Arabic about: ${topic}. 
    Provide a header, subheader, and 5 key points with short descriptions. 
    Use a professional journalistic tone.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          header: { type: Type.STRING },
          subHeader: { type: Type.STRING },
          points: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING, description: "One of: train, satellite, car, phone, gold, globe, shopping, cpu, factory, rocket, security, energy" }
              }
            }
          }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
}

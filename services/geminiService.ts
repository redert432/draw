import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getDrawingInspiration = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'أعطني فكرة رسم إبداعية، قصيرة وممتعة باللغة العربية للفنانين الرقميين. أقل من 15 كلمة. بدون مقدمات.',
      config: {
        temperature: 0.9,
      }
    });

    return response.text?.trim() || "ارسم منظر غروب الشمس فوق مدينة مستقبلية";
  } catch (error) {
    console.error("Error fetching inspiration:", error);
    return "ارسم زهرة تنمو في الفضاء"; // Fallback
  }
};
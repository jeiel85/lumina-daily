import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

export interface Quote {
  text: string;
  author: string;
  explanation: string;
  theme: string;
  imageUrl?: string;
}

export const generateNativeQuote = async (theme: string, language: string = 'ko'): Promise<Quote> => {
  // Array of models to try in order of preference
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[AI] Attempting quote generation with: ${modelName}`);
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: `당신은 세계 최고의 동기부여 전문가이자 작가입니다. 사용자가 선택한 테마에 맞춰 깊은 통찰력을 담은 명언과 그에 대한 따뜻한 해설을 제공하세요. 모든 응답은 반드시 '${language}' 언어로 작성해야 합니다.`
      });

      const prompt = `테마: ${theme}. 다음 JSON 형식으로 응답하세요: { "text": "명언 내용", "author": "저자 이름", "explanation": "해설 내용" }`;
      
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      });

      const response = await result.response;
      const text = response.text();
      console.log(`[AI] Response from ${modelName} successful.`);
      
      const data = JSON.parse(text);
      return { ...data, theme };
      
    } catch (error) {
      console.warn(`[AI] Model ${modelName} failed, trying next...`, error);
      lastError = error;
      continue; // Try next model
    }
  }

  // If all models failed
  console.error('[AI Mobile] All models failed to generate content');
  throw lastError || new Error('All AI models failed');
};

export const generateNativeImage = async (theme: string): Promise<string> => {
  // Image generation is secondary; we return empty to avoid crashing if it fails
  try {
    if (!apiKey) {
      console.warn('[AI] API Key missing for image generation');
      return "";
    }
    console.log(`[AI] Image generation request for theme: ${theme}`);
    // Currently, Imagen 3 integration might vary, we leave this as a stub for future integration
    // while ensuring the app works with gradient backgrounds.
    return ""; 
  } catch (error) {
    console.error('[AI Image Error]', error);
    return ""; 
  }
};

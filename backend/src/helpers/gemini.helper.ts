import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../common/constant";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function aiGenerateContent(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  const responseWithoutWrap = response.text
    ?.replace("```json", "")
    .replace("```", "");
  const responseJson = JSON.parse(responseWithoutWrap || "[]");
  return responseJson;
}

async function aiGenerateCaption(
  socialMedia: string,
  subject: string,
  tone: string
) {
  const prompt = [
    `You are a social media caption creator. Create 5 engaging and creative captions for ${socialMedia}`,
    `Subject: ${subject}`,
    `Tone: ${tone}`,
    "Please return json format",
  ].join("\n");
  return aiGenerateContent(prompt);
}

async function aiGenerateIdea(idea: string) {
  const prompt = [
    `Generate 5 post ideas for a topic${idea}`,
    `Each idea should be a short sentence for 7 to 10 words`,
    `Please return json format`,
  ].join("\n");
  return aiGenerateContent(prompt);
}

async function aiGenerateCaptionByIdea(idea: string) {
  const prompt = [
    `Generate 5 post captions for a topic${idea}`,
    `Please return json format`,
  ].join("\n");
  return aiGenerateContent(prompt);
}

export { aiGenerateCaption, aiGenerateIdea, aiGenerateCaptionByIdea };

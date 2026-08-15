import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
});

export const geradorDesculpa = async (evento: string) => {
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),

      system:
        "Gere apenas uma desculpa engraçada, criativa e que não ofenda ninguém.",
      prompt: evento,
    });

    return text;
  } catch (e) {
    console.log(e.message);
    return e.message;
    //return "Tenho de levar minha vó no jiu-jitsu";
  }
};

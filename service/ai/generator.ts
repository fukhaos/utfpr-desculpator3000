import OpenAI from "openai";

type ProvedorIA = "openai" | "gemini";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

const gemini = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  dangerouslyAllowBrowser: true,
});

export async function geradorDesculpa(
  evento: string,
  provedor: ProvedorIA = "openai",
) {
  try {
    const cliente = provedor === "gemini" ? gemini : openai;
    const modelo = provedor === "gemini" ? "gemini-2.0-flash" : "gpt-4o-mini";

    const result = await cliente.chat.completions.create({
      model: modelo,
      messages: [
        {
          role: "system",
          content:
            "Gere apenas uma desculpa engraçada, criativa e que não ofenda ninguém",
        },
        { role: "user", content: evento },
      ],
      max_tokens: 100,
    });

    const texto = result.choices[0]?.message?.content;

    return texto || "Tenho de levar minha vó ao jiu-jitsu.";
  } catch (e) {
    console.error("ERRO:", e);
    return "Tenho de levar minha vó ao jiu-jitsu.";
  }
}

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateImage, generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
});

export type Usage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
};

// Preços em USD por 1M de tokens.
// gemini-3.6-flash válido até 31/12/2026; gemini-2.5-flash-image cobra output
// de imagem como tokens (~1290 tokens por imagem 1024x1024 = US$0,039).
const PRECO_TEXTO = { input: 0.75, output: 3.75 };
const PRECO_IMAGEM = { input: 0.3, output: 30 };

const calcularCusto = (usage: Usage, preco: { input: number; output: number }) => {
  return (
    (usage.inputTokens / 1_000_000) * preco.input +
    (usage.outputTokens / 1_000_000) * preco.output
  );
};

export const custoEstimadoTexto = (usage: Usage) => calcularCusto(usage, PRECO_TEXTO);
export const custoEstimadoImagem = (usage: Usage) => calcularCusto(usage, PRECO_IMAGEM);

export const geradorDesculpa = async (evento: string) => {
  const usageVazio: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };

  try {
    const { text, usage } = await generateText({
      model: google("gemini-3.6-flash"),

      system:
        "Gere apenas uma desculpa engraçada, criativa e que não ofenda ninguém.",
      prompt: evento,
    });

    return {
      texto: text,
      usage: {
        inputTokens: usage.inputTokens ?? 0,
        outputTokens: usage.outputTokens ?? 0,
        totalTokens: usage.totalTokens ?? 0,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return { texto: e.message, usage: usageVazio };
  }
};

export const geradorImagem = async (desculpa: string) => {
  const usageVazio: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };

  try {
    const { image, usage } = await generateImage({
      model: google.image("gemini-2.5-flash-image"),
      prompt: `Ilustração divertida e colorida representando esta desculpa: ${desculpa}`,
    });

    return {
      url: `data:${image.mediaType};base64,${image.base64}`,
      usage: {
        inputTokens: usage.inputTokens ?? 0,
        outputTokens: usage.outputTokens ?? 0,
        totalTokens: usage.totalTokens ?? 0,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return { url: null, usage: usageVazio };
  }
};

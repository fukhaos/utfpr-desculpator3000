# Desculpator 3000

Desculpator 3000 é um exemplo de como chamar a IA do Google (Gemini) para pedir uma desculpa: a partir de um evento digitado pelo usuário, o app gera um texto de desculpa e uma imagem ilustrando a cena, além de mostrar quantos tokens foram consumidos e o custo estimado em USD.

## Como funciona

- `service/ai/generator.ts` chama `generateText` (modelo `gemini-3.6-flash`) para gerar o texto da desculpa, e `generateImage` (modelo `gemini-2.5-flash-image`) para gerar uma ilustração a partir desse texto.
- Cada chamada retorna também o uso de tokens (`inputTokens`, `outputTokens`, `totalTokens`), usado para calcular o custo estimado com os preços oficiais do Gemini.
- `app/index.tsx` exibe o texto, os tokens/custo e a imagem gerados dentro de containers roláveis.

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com sua chave da Gemini API ([obtenha uma aqui](https://aistudio.google.com/apikey)):

   ```
   EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_aqui
   ```

   Geração de imagem requer billing habilitado no projeto do Google AI Studio (o tier gratuito não libera cota para modelos de imagem).

3. Inicie o app:

   ```bash
   npx expo start
   ```

## Exemplo de uso

O marido pediu para o Desculpator dar uma desculpa para ele andar de moto. O Desculpator mostrou o texto:

> **Sua desculpa está pronta**
>
> "Amor, não é um passeio de lazer, é uma missão científica de extrema urgência: fui ali rodar uns quilômetros com o pessoal do couro só pra testar se o asfalto tá macio o suficiente pra quando eu for te levar pra passear!"

E gerou a imagem:

![Exemplo de desculpa gerada](docs/imagem.png)

Junto com o resumo de custo:

> Tokens usados: 1129 (entrada: 39, saída: 1090) · Custo estimado: $0.004117

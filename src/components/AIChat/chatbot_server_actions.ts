


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

export async function ChatBot(s:string) {
   console.log(s)
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: s,
  });
  console.log(response.text)
  return  response.text;
}

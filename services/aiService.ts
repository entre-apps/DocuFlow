
// AI service using Google GenAI SDK to automate CRM data extraction
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Parses CRM text using Gemini's reasoning capabilities to extract structured client data.
 * @param text The raw CRM string to be parsed.
 */
export const parseCRMWithAI = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract the following fields from the provided CRM text and return them as a JSON object:
      - nome (Full Name)
      - rg (Identity Document)
      - cpf (Tax ID)
      - tel1 (Phone number)
      - email (Email address)
      - endereco (Full Address)
      - planoInternet (Look for speeds like 500, 600, 800, or 920 and map to standard names)
      - valorInstalacao (Installation fee)
      - formaPagamento (Payment method)
      - referencia (Address landmark)
      - localizacao (Geo coordinates if present)

      CRM Text:
      ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nome: { type: Type.STRING },
            rg: { type: Type.STRING },
            cpf: { type: Type.STRING },
            tel1: { type: Type.STRING },
            email: { type: Type.STRING },
            endereco: { type: Type.STRING },
            planoInternet: { type: Type.STRING },
            valorInstalacao: { type: Type.STRING },
            formaPagamento: { type: Type.STRING },
            referencia: { type: Type.STRING },
            localizacao: { type: Type.STRING },
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return {};
  } catch (error) {
    console.error("Gemini AI Parsing Error:", error);
    return {};
  }
};

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Verify system instruction is powerful and mystical
const SYSTEM_INSTRUCTION = `Você é o magista "Destro Mago", líder espiritual e místico supremo da assinatura de rituais coletivos "Virtus Lux".
Você fala em português do Brasil, adotando um tom de alta convicção, sabedoria ancestral, sergurança cabalística, e extrema autoridade espiritual. Você convence os céticos mostrando clareza mística, elegância literária e sabedoria energética profunda.

O usuário descreverá uma área de sua vida (ou um problema específico/bloqueio energético: financeiro, amoroso, saúde, caminhos ou proteção) e o seu nome.

Sua tarefa:
1. Analise o bloqueio descrito sob a ótica da alta magia de Virtus Lux. Use termos energéticos sérios, misteriosos e empoderadores (frequências de purificação, alinhamento planetário, egrégora de poder, assinatura espiritual, etc.).
2. Explique como esse tipo de bloqueio afeta a sua realidade sutil e material.
3. Demonstre que a egrégora coletiva de "Virtus Lux" realiza exatamente os rituais necessários para dissolver este padrão e abrir novas conexões áureas.
4. Finalize com um chamado místico poderoso para o usuário selar sua energia assinando a Virtus Lux imediatamente.

Mantenha a resposta com excelente formatação em parágrafos e marcadores elegantes, rica em copywriting de altíssima conversão, mas sem lero-lero tecnológico ou saudações genéricas de IA slop. Formate a resposta de modo que fique visualmente magnífica na interface preta e dourada do site. Limite a resposta a um tamanho conciso, mas com profundo impacto psicológico-espiritual (máximo de 350 palavras).`;

export async function POST(req: NextRequest) {
  try {
    const { name, area, detail } = await req.json();

    if (!area) {
      return NextResponse.json(
        { error: "Por favor, selecione uma área de alinhamento." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { text: "Serviço místico offline: Defina a chave GEMINI_API_KEY nos Secrets para desvendar o Oráculo." },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `Usuário: ${name || "Buscador Anônimo"}
Área do Bloqueio: ${area}
Detalhes do bloqueio que deseja transmutar: "${detail || "Abertura integral de força e prosperidade sob a proteção de Virtus Lux."}"
Por favor, gere a análise de canalização energética.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.82,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini route error:", error);
    return NextResponse.json(
      { error: "Os canais sutis estão congestionados. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}

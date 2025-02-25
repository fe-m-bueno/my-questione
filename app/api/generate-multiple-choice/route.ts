import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { materia, ensino, turma, dificuldade, tema } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not found');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Gere 5 perguntas de múltipla escolha sobre "${tema}" da matéria "${materia}" para alunos do ensino ${ensino}, turma ${turma}, com nível de dificuldade "${dificuldade}".

- Cada questão deve ter 5 alternativas (a, b, c, d, e).
- Indique a resposta correta e forneça uma justificativa clara.
- Retorne apenas um JSON válido no seguinte formato:
{
  "questions_multiple_choice": [
    {
      "question": "Pergunta 1",
      "options": [
        "a) Opção A",
        "b) Opção B",
        "c) Opção C",
        "d) Opção D",
        "e) Opção E"
      ],
      "correct_answer": "c) Explicação da resposta correta",
      "justification": "Justificativa da resposta correta"
    },
    {
      "question": "Pergunta 2",
      "options": [
        "a) Opção A",
        "b) Opção B",
        "c) Opção C",
        "d) Opção D",
        "e) Opção E"
      ],
      "correct_answer": "b) Explicação da resposta correta",
      "justification": "Justificativa da resposta correta"
    },
    **Gere 5 nesse modelo**
  ]
}
- Não inclua explicações, formatação Markdown ou trechos de código como \`\`\`json.

    `;

    const result = await model.generateContent(prompt);
    let textResponse = result.response.text();

    console.log('📢 Resposta bruta do Gemini:', textResponse);

    textResponse = textResponse
      .replace(/^```json\s*/, '')
      .replace(/```$/, '')
      .replace(/\u0000/g, '')
      .replace(/\r/g, '')
      .replace(/\t/g, ' ')
      .trim();

    try {
      const jsonResponse = JSON.parse(textResponse);
      return NextResponse.json(jsonResponse);
    } catch (error) {
      console.error('❌ Erro ao converter resposta para JSON:', error);
      return NextResponse.json(
        { error: 'Formato de resposta inválido' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar perguntas' },
      { status: 500 }
    );
  }
}

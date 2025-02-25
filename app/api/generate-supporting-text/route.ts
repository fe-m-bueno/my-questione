import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { materia, ensino, turma, dificuldade, tema } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not found');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Gere um texto de apoio sobre "${tema}" da matéria "${materia}" para alunos do ensino ${ensino}, turma ${turma}, com nível de dificuldade "${dificuldade}". O texto deve ser informativo e adequado ao nível de ensino especificado.

- O texto deve ter entre 4 e 5 parágrafos, estruturado de forma clara e coerente.
- O nível de dificuldade deve influenciar a complexidade do conteúdo.
- Retorne apenas um JSON válido no seguinte formato, sem quebra de linhas dentro das strings:
{
  "supporting_text": "Texto explicativo aqui"
}
- Não inclua explicações, formatação Markdown ou trechos de código como \`\`\`json. ou \`\`\` ou qualquer tipo de character não parseável.

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

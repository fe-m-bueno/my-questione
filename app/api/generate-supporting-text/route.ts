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
  Gere um JSON estritamente válido, SEM formatação errada.
  - NÃO adicione barras invertidas (\) antes de caracteres.
  - NÃO compacte os parágrafos, deixe com quebra de linha dupla (\n\n).
  - NÃO formate como markdown, código ou qualquer outro formato.
  - Retorne um JSON puro, sem caracteres extras.
  Formato do JSON:
{
  "supporting_text": {
    "paragraph1": "Texto do parágrafo 1",
    "paragraph2": "Texto do parágrafo 2",
    "paragraph3": "Texto do parágrafo 3",
    "paragraph4": "Texto do parágrafo 4",
    "paragraph5": "Texto do parágrafo 5"
  }
}
    `;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2 },
    });
    let textResponse = result.response.text();

    console.log('📢 Resposta bruta do Gemini:', textResponse);

    textResponse = textResponse
      .replace(/^```json\s*/, '') // Remove ```json do início
      .replace(/```$/, '') // Remove ``` do final
      .replace(/\u0000/g, '') // Remove caracteres nulos
      .replace(/\r/g, '') // Remove caracteres de retorno de carro
      .replace(/\t/g, ' ') // Substitui tabulações por espaço
      .replace(/[\u0000-\u001F\u007F]/g, '') // Remove caracteres invisíveis ASCII
      .replace(/\\n/g, '\n') // Converte \n literais em quebras reais
      .replace(/\n{2,}/g, '\n\n') // Garante espaçamento correto entre parágrafos
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

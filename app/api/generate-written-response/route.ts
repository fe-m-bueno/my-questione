import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { materia, ensino, turma, dificuldade, tema } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not found');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Você é um gerador de questões para professores. A partir dos parâmetros fornecidos ("matéria": ${materia}, "tipo de ensino": ${ensino}, "turma": ${turma}, "dificuldade": ${dificuldade} e "tema": ${tema}), não fuja do tema, pense bem para não fugir do escopo, gere questões e um texto de apoio seguindo rigorosamente este formato:

        -Retorne APENAS um JSON válido, sem explicações, sem comentários e sem formatação Markdown.        
        -NÃO inclua trechos de código como \`\`\`json ou \`\`\`.
        -Retorne APENAS o JSON puro e válido.
    
    **Questões de Resposta Escrita:**
    1. [Pergunta]
     **Resposta correta** 
    2. [Pergunta]
    **Resposta correta** 
    3. [Pergunta]
    **Resposta correta** 
    4. [Pergunta]
    **Resposta correta** 
    5. [Pergunta]
    **Resposta correta** 
    
    ### Regras:
    - As questões devem ser coerentes com os parâmetros fornecidos.
    - O nível de dificuldade deve influenciar a complexidade das perguntas e respostas.
    - Não inclua nenhuma informação extra além do formato especificado.
    - Deve retornar um JSON no schema a seguir:
    Questions =  {
      "questions_written_response": {
        "type": "array",
        "items": {
          "type": "object",
        "properties": {
          "question": { "type": "string" },
          "correct_answer": { "type": "string" }
        },
        "required": ["question", "correct_answer"]
      },
      "minItems": 5,
      "maxItems": 5
      }
    }
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

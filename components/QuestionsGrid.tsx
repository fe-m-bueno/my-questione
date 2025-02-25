'use client';

import { useState } from 'react';
import ClipboardButton from './ClipboardButton';
import RegenerateButton from './RegenarateButton';

interface QuestionsData {
  questions_multiple_choice: {
    question: string;
    options: string[];
    correct_answer: string;
    justification: string;
  }[];
  questions_written_response: {
    question: string;
    correct_answer: string;
  }[];
  supporting_text: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    paragraph5: string;
  };
}

export default function QuestionsGrid({
  data,
  onRegenerate,
}: {
  data: QuestionsData;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const cleanText = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/_/g, '')
      .replace(/`/g, '')
      .replace(/[📌✅💡✏]/g, '')
      .replace(/(^|\n)\s*-\s+/g, '\n')
      .trim();
  };

  const copyQuestionsOnly = {
    multipleChoice: cleanText(
      data.questions_multiple_choice
        .map(
          (q, index) => `${index + 1}. ${q.question}\n${q.options.join('\n')}`
        )
        .join('\n\n')
    ),
    writtenResponse: cleanText(
      data.questions_written_response
        .map((q, index) => `${index + 1}. ${q.question}`)
        .join('\n\n')
    ),
    supportingText: cleanText(Object.values(data.supporting_text).join('\n\n')),
  };

  const copyFullText = {
    multipleChoice: cleanText(
      data.questions_multiple_choice
        .map(
          (q, index) =>
            `${index + 1}. ${q.question}\n   ${q.options.join(
              '\n   '
            )}\nResposta: ${q.correct_answer}\nJustificativa: ${
              q.justification
            }`
        )
        .join('\n\n')
    ),
    writtenResponse: cleanText(
      data.questions_written_response
        .map(
          (q, index) =>
            `${index + 1}. ${q.question}\nResposta sugerida: ${
              q.correct_answer
            }`
        )
        .join('\n\n')
    ),
    supportingText: cleanText(Object.values(data.supporting_text).join('\n\n')),
  };
  const copyAllText = `${copyQuestionsOnly.multipleChoice}\n\n${copyQuestionsOnly.writtenResponse}\n\n${copyFullText.supportingText}`;
  const copyAllTextWithAnswers = `${copyFullText.multipleChoice}\n\n${copyFullText.writtenResponse}\n\n${copyFullText.supportingText}`;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-3 gap-6 w-full">
        <div className="bg-light-foreground dark:bg-dark-foreground shadow-md rounded-lg p-6 border border-light-border dark:border-dark-border text-pretty">
          <h2 className="text-lg font-bold mb-3">
            📌 Perguntas de Múltipla Escolha
          </h2>
          {data.questions_multiple_choice.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-base/7">
                {index + 1}. {q.question}
              </p>
              <ul className="list-none pl-6">
                {q.options.map((option, i) => (
                  <li key={i} className="text-base/7">
                    {option}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm/7 text-light-accentBlue dark:text-dark-accentGreen font-semibold bg-white/95 dark:bg-black/15 border border-light-border dark:border-dark-border rounded-2xl p-4 my-2">
                ✅ Resposta: {q.correct_answer}
              </p>
              <p className="mt-1 text-sm/6">💡 {q.justification}</p>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <ClipboardButton
              text={copyQuestionsOnly.multipleChoice}
              label="Copiar Perguntas"
            />
            <ClipboardButton
              text={copyFullText.multipleChoice}
              label="Copiar Tudo"
            />
          </div>
        </div>

        <div className="bg-light-foreground dark:bg-dark-foreground shadow-md rounded-lg p-6 border border-light-border dark:border-dark-border text-pretty">
          <h2 className="text-lg font-bold mb-3">✏ Perguntas Dissertativas</h2>
          {data.questions_written_response.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-base/7">
                {index + 1}. {q.question}
              </p>
              <p className="mt-2 font-semibold text-sm/7 text-light-accentBlue dark:text-dark-accentGreen bg-white/95 dark:bg-black/15 border border-light-border dark:border-dark-border rounded-2xl p-4 my-2">
                ✅ Resposta sugerida: {q.correct_answer}
              </p>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <ClipboardButton
              text={copyQuestionsOnly.writtenResponse}
              label="Copiar Perguntas"
            />
            <ClipboardButton
              text={copyFullText.writtenResponse}
              label="Copiar Tudo"
            />
          </div>
        </div>

        <div className="bg-light-foreground dark:bg-dark-foreground shadow-md rounded-lg p-6 border border-light-border dark:border-dark-border text-pretty">
          <h2 className="text-lg font-bold mb-3">📖 Texto de Apoio</h2>
          <p className="text-sm/7 whitespace-pre-wrap font-semibold">
            {Object.values(data.supporting_text).join('\n\n')}
          </p>

          <div className="flex gap-2 mt-4">
            <ClipboardButton
              text={copyQuestionsOnly.supportingText}
              label="Copiar Texto"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <RegenerateButton onClick={onRegenerate} />
        <ClipboardButton
          text={copyAllText}
          label="Copiar Tudo (Sem respostas)"
        />
        <ClipboardButton
          text={copyAllTextWithAnswers}
          label="Copiar Tudo (Com respostas)"
        />
      </div>
    </div>
  );
}

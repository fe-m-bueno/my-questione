'use client';

import { useEffect, useState } from 'react';
import InputForm from '@/components/InputForm';
import QuestionsGrid from '@/components/QuestionsGrid';
import TheSidebar from '@/components/TheSidebar';
import TheNavbar from '@/components/TheNavbar';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Home() {
  const [questions, setQuestions] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<any[]>('questionHistory', []);

  const [currentParams, setCurrentParams] = useState<any>({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return <div className="p-6 text-center">Carregando...</div>;
  }
  const cleanJSON = (text: string) => {
    return text
      .replace(/^```json\s*/, '') // Remove ```json no início
      .replace(/```$/, '') // Remove ``` no final
      .replace(/\u0000/g, '') // Remove caracteres invisíveis
      .replace(/\r/g, '') // Remove carriage return
      .replace(/\t/g, '') // Remove tabulações
      .trim();
  };

  const fetchQuestions = async (data: any) => {
    setLoading(true);
    setError(null);
    setQuestions(null);
    setCurrentParams(data);

    try {
      const [multipleChoiceResponse, writtenResponse, supportingTextResponse] =
        await Promise.all([
          fetch('/api/generate-multiple-choice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),
          fetch('/api/generate-written-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),
          fetch('/api/generate-supporting-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),
        ]);

      if (
        !multipleChoiceResponse.ok ||
        !writtenResponse.ok ||
        !supportingTextResponse.ok
      ) {
        throw new Error('Erro na API. Tente novamente.');
      }

      const multipleChoiceJson = JSON.parse(
        cleanJSON(await multipleChoiceResponse.text())
      );
      const writtenResponseJson = JSON.parse(
        cleanJSON(await writtenResponse.text())
      );
      const supportingTextJson = JSON.parse(
        cleanJSON(await supportingTextResponse.text())
      );

      const finalJson = {
        questions_multiple_choice: multipleChoiceJson.questions_multiple_choice,
        questions_written_response:
          writtenResponseJson.questions_written_response,
        supporting_text: supportingTextJson.supporting_text,
      };

      setQuestions(finalJson);

      const newHistory = [
        { params: data, json: finalJson, tema: data.tema },
        ...history,
      ].slice(0, 10);
      setHistory(newHistory);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDifficulty = (newDifficulty: string) => {
    if (!history.length) {
      alert(
        'Nenhum tema carregado! Gere uma pergunta antes de alterar a dificuldade.'
      );
      return;
    }
    const selectedParams =
      history.find((h) => h.json === questions)?.params || currentParams;

    fetchQuestions({ ...selectedParams, dificuldade: newDifficulty });
  };
  const resetQuestions = () => {
    setQuestions(null);
    setError(null);
    setCurrentParams(null);
  };

  return (
    <div className="flex">
      <TheSidebar
        history={history ?? []}
        onSelect={(item) => setQuestions(item)}
        onClear={() => setHistory([])}
        onDelete={(index) => {
          const newHistory = history.filter((_, i) => i !== index);
          setHistory(newHistory);
        }}
      />

      <div className="flex-1 w-full min-h-screen">
        <TheNavbar
          currentParams={currentParams}
          onUpdateDifficulty={updateDifficulty}
          onReset={resetQuestions}
          showFilters={questions !== null}
        />

        {loading && <Loading />}

        {error && (
          <ErrorFallback
            message={error}
            onRetry={() => fetchQuestions(history[0]?.params || {})}
          />
        )}

        {!loading && !error && !questions && (
          <InputForm onSubmit={fetchQuestions} />
        )}

        {!loading && !error && questions && (
          <QuestionsGrid
            data={questions}
            onRegenerate={() => fetchQuestions(history[history.length - 1])}
          />
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

const loadingTexts = [
  'Carregando perguntas, por favor aguarde...',
  'Analisando o tema e gerando questões...',
  'Buscando as melhores perguntas para você...',
  'Preparando o conteúdo com precisão...',
  'Refinando os detalhes para melhor qualidade...',
  'Formatando as perguntas e respostas...',
  'Finalizando o processamento...',
];

export default function Loading() {
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        setFade(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="w-12 h-12 border-4 border-light-accentBlue/15 dark:border-dark-accentBlue/15 border-t-light-accentBlue dark:border-t-dark-accentBlue rounded-full animate-spin mb-4"></div>
        <p
          className={`text-lg font-medium transition-opacity duration-500 ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {loadingTexts[textIndex]}
        </p>
      </div>
    </div>
  );
}

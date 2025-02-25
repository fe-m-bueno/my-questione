'use client';

import { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import AutosizeTextarea from './AutoTextArea';
const ENSINO_OPTIONS = ['Fundamental I', 'Fundamental II', 'Médio', 'Superior'];
const TURMAS: Record<string, string[]> = {
  'Fundamental I': ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano'],
  'Fundamental II': ['6º Ano', '7º Ano', '8º Ano', '9º Ano'],
  Médio: ['1º Ano', '2º Ano', '3º Ano'],
};
const DIFICULDADES = [
  'Muito Fácil',
  'Fácil',
  'Média',
  'Difícil',
  'Muito Difícil',
];

export default function InputForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const [tema, setTema] = useState('');
  const [materia, setMateria] = useState('');
  const [ensino, setEnsino] = useState(ENSINO_OPTIONS[0]);
  const [turma, setTurma] = useState(TURMAS['Fundamental I'][0]);
  const [dificuldade, setDificuldade] = useState(DIFICULDADES[2]);
  useEffect(() => {
    if (ensino in TURMAS) {
      setTurma(TURMAS[ensino][0]);
    } else {
      setTurma('');
    }
  }, [ensino]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl mx-auto p-4 ">
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4 items-center justify-center">
        <AutosizeTextarea
          label="Tema"
          value={tema}
          onChange={setTema}
          placeholder="Digite o tema..."
        />

        <AutosizeTextarea
          label="Matéria"
          value={materia}
          onChange={setMateria}
          placeholder="Digite a matéria..."
        />

        <CustomSelect
          options={ENSINO_OPTIONS}
          selected={ensino}
          onChange={setEnsino}
          label="Escolha o nível de ensino"
        />

        {ensino !== 'Superior' && (
          <CustomSelect
            options={TURMAS[ensino]}
            selected={turma}
            onChange={setTurma}
            label="Escolha a turma"
          />
        )}

        <CustomSelect
          options={DIFICULDADES}
          selected={dificuldade}
          onChange={setDificuldade}
          label="Escolha a dificuldade"
        />

        <button
          onClick={() =>
            onSubmit({ tema, ensino, turma, dificuldade, materia })
          }
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            onSubmit({ tema, ensino, turma, dificuldade, materia })
          }
          className="bg-dark-foreground dark:bg-light-foreground text-xl text-white dark:text-black py-3 px-1 rounded-2xl hover:bg-dark-foreground/90 dark:hover:bg-light-foreground/90 transition ~w-36/48"
        >
          Gerar Perguntas
        </button>
      </div>
    </div>
  );
}

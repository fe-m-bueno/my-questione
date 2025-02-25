'use client';

import { useEffect, useMemo, useState } from 'react';
import { BicepsFlexed, PlusCircle, Sparkle } from 'lucide-react';
import CustomSelect from './CustomSelect';
import ThemeToggle from './ThemeToggle';

export default function Navbar({
  currentParams,
  onUpdateDifficulty,
  onReset,
  showFilters,
}: {
  currentParams: any;
  onUpdateDifficulty: (difficulty: string) => void;
  onReset: () => void;
  showFilters: boolean;
}) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const currentDifficulty = useMemo(() => {
    return currentParams?.difficulty || 'Média';
  }, [currentParams]);

  const [difficulty, setDifficulty] = useState(currentDifficulty);
  useMemo(() => {
    setDifficulty(currentDifficulty);
  }, [currentDifficulty]);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return (
      <nav className="p-4 bg-light-sidebar dark:bg-dark-sidebar shadow-md"></nav>
    );
  }

  const handleSubmit = () => {
    onUpdateDifficulty(difficulty);
    setShowFilterOptions(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 py-5 bg-light-sidebar dark:bg-dark-sidebar shadow-md">
      <div
        aria-roledescription="Botão para resetar o gerador de perguntas"
        onClick={onReset}
        className="flex flex-row items-center justify-around gap-4 ~pl-8/32"
      >
        <Sparkle className="w-5 h-5" />
        <h1 className="text-lg font-mono font-semibold cursor-pointer">
          Questione
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {showFilters && (
          <div className="relative">
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              aria-label="Alterar Dificuldade"
              className="flex items-center gap-2 bg-light-accentBlue dark:bg-dark-accentBlue text-white px-4 py-2 rounded hover:bg-light-accentBlue/90 dark:hover:bg-dark-accentBlue/90 transition sm:text-hidden"
            >
              <BicepsFlexed className="w-5 h-5" />
              <span className="hidden sm:block">Dificuldade</span>
            </button>

            {showFilterOptions && (
              <div className="absolute left-0 right-0 top-full w-52 mt-2 bg-light-sidebar dark:bg-dark-sidebar shadow-lg p-4 rounded-md">
                <CustomSelect
                  options={['Muito Fácil', 'Fácil', 'Média']}
                  selected={difficulty}
                  onChange={setDifficulty}
                  label="Escolha a dificuldade"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-3 w-full bg-light-accentGreen dark:bg-dark-accentGreen text-white py-2 rounded hover:bg-light-accentGreen/90 dark:hover:bg-dark-accentGreen/90 transition"
                >
                  Gerar Questões
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-light-accentGreen dark:bg-dark-accentGreen text-white px-4 py-2 rounded hover:bg-light-accentGreen/90 dark:hover:bg-dark-accentGreen/90 transition"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="hidden sm:block">Novo</span>
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
}

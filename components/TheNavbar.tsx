'use client';

import { useEffect, useMemo, useState } from 'react';
import { PlusCircle, Sparkle } from 'lucide-react';

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

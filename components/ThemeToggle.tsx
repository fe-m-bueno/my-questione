'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return (
      <div className="p-4 bg-light-sidebar dark:bg-dark-sidebar shadow-md">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded ${
          theme === 'light'
            ? 'bg-dark-foreground/5 dark:bg-dark-foreground/50'
            : ''
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded ${
          theme === 'dark'
            ? 'bg-light-foreground/5 dark:bg-dark-foreground/50'
            : ''
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
}

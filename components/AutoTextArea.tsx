'use client';

import { useRef } from 'react';
import useAutosizeTextArea from '../hooks/useAutoResizeArea';

interface AutoTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export default function AutoTextarea({
  value,
  onChange,
  placeholder = 'Digite aqui...',
  label,
}: AutoTextareaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-0">
        <label className="text-md m-1 block">{label}</label>
        <textarea
          ref={textAreaRef}
          className="w-full border border-light-border dark:border-dark-border rounded-2xl py-2 px-4 bg-light-foreground dark:bg-dark-foreground dark:text-white focus:ring-2 focus:outline-none focus:ring-light-accentBlue dark:focus:ring-dark-accentBlue resize-none overflow-hidden"
          rows={1}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

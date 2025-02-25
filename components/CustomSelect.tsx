'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  label: string;
}

export default function CustomSelect({
  options,
  selected,
  onChange,
  label,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label className="text-md m-1 block">{label}</label>
      <Listbox
        value={selected}
        onChange={(value) => {
          onChange(value);
          setOpen(false);
        }}
      >
        <ListboxButton
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center w-full py-2 px-4 border border-light-border dark:border-dark-border rounded-2xl bg-light-foreground dark:bg-dark-foreground dark:text-white"
        >
          {selected}
          <ChevronDown className="w-5 h-5" />
        </ListboxButton>
        {open && (
          <ListboxOptions className="absolute mt-2 w-full z-10 bg-light-foreground dark:bg-dark-foreground shadow-lg rounded-2xl max-h-60 overflow-auto border border-light-border dark:border-dark-border">
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className="cursor-pointer py-2 px-4 hover:bg-light-sidebar dark:hover:bg-dark-sidebar flex justify-between"
              >
                {option}
                {selected === option && (
                  <Check className="w-4 h-4 text-light-text dark:text-dark-text" />
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </Listbox>
    </div>
  );
}

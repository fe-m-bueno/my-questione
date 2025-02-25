'use client';

import { useState } from 'react';
import { X, Trash2, Menu } from 'lucide-react';

export default function Sidebar({
  history,
  onSelect,
  onDelete,
  onClear,
}: {
  history: any[];
  onSelect: (data: any) => void;
  onDelete: (index: number) => void;
  onClear: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 p-2 bg-light-sidebar dark:bg-dark-sidebar rounded"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-light-sidebar dark:bg-dark-sidebar shadow-md p-4 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">📜 Histórico</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-light-text dark:text-dark-text">
              Nenhum histórico salvo.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm bg-light-foreground dark:bg-dark-foreground p-2 rounded cursor-pointer hover:bg-light-foreground dark:hover:bg-dark-foreground/75 transition"
                  onClick={() => {
                    onSelect(item.json);
                    setIsOpen(false);
                  }}
                >
                  <span className="flex-1 truncate">{item?.params?.tema}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {history.length > 0 && (
            <button
              onClick={onClear}
              className="w-full bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-600"
            >
              Excluir Tudo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

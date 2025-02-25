'use client';

export default function RegenarateButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-light-accentGreen/80 dark:bg-dark-accentGreen/80 text-white px-4 py-2 rounded-lg hover:bg-light-accentGreen/75 dark:hover:bg-dark-accentGreen/90 transition"
    >
      Gerar Novamente
    </button>
  );
}

'use client';

export default function ClipboardButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`📋 copiado!`);
    } catch (error) {
      console.error('Erro ao copiar.', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-dark-sidebar dark:bg-light-sidebar text-white dark:text-light-text px-4 py-2 rounded-lg hover:bg-dark-sidebar/90 dark:hover:bg-light-sidebar/90 transition"
    >
      {label}
    </button>
  );
}

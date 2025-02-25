export default function ErrorFallback({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-light-accentRed/10 dark:bg-dark-accentRed/10 border border-light-accentRed/30 dark:border-dark  -accentRed/30 rounded-md">
      <p className="text-light-accentRed dark:text-dark-accentRed font-semibold">
        ❌ {message}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 bg-light-accentRed dark:bg-dark-accentRed text-white px-4 py-2 rounded hover:bg-light-accentRed/90 dark:hover:bg-dark-accentRed/90 transition"
      >
        Tentar Novamente
      </button>
    </div>
  );
}

export function ZumaLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-800 ${className}`}
    >
      ZUMA
    </div>
  );
}

import { Info } from "lucide-react";

export function Disclaimer({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-saffron-200 bg-saffron-50 p-4 text-sm text-saffron-800 dark:border-saffron-900/40 dark:bg-saffron-900/20 dark:text-saffron-200">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

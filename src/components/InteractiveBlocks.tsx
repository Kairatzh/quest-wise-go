import { useState } from "react";
import { Play, Check, X, RotateCw, Terminal } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { GradientButton } from "./GradientButton";
import { cn } from "@/lib/utils";

/* --- Code block --- */
export function CodeBlock({ initial = "print('Hello, Fill AI!')" }: { initial?: string }) {
  const [code, setCode] = useState(initial);
  const [output, setOutput] = useState<string | null>(null);
  return (
    <GlassCard strong className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" />
          <span>main.py</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="block w-full resize-none border-0 bg-transparent p-4 font-mono text-sm text-foreground outline-none"
        rows={5}
      />
      <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
        <span className="text-xs text-muted-foreground">Python 3.11</span>
        <GradientButton size="sm" onClick={() => setOutput(`> ${code.match(/'(.*?)'/)?.[1] ?? "Готово"}`)}>
          <Play className="h-3.5 w-3.5" /> Запустить
        </GradientButton>
      </div>
      {output && (
        <div className="border-t border-border/50 bg-black/40 p-4 font-mono text-sm text-success animate-fade-in">
          {output}
        </div>
      )}
    </GlassCard>
  );
}

/* --- Quiz block --- */
const quiz = {
  q: "Какой результат вернёт `len('Fill AI')`?",
  options: ["6", "7", "8", "Ошибка"],
  answer: 1,
};
export function QuizBlock() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <GlassCard strong className="p-6">
      <h4 className="mb-5 text-lg font-semibold text-foreground">{quiz.q}</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {quiz.options.map((opt, i) => {
          const isPicked = picked === i;
          const correct = picked !== null && i === quiz.answer;
          const wrong = isPicked && i !== quiz.answer;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              disabled={picked !== null}
              className={cn(
                "group flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-left text-sm font-medium transition-smooth hover:border-primary/50 hover:bg-secondary",
                correct && "border-success bg-success/10 text-success shadow-[0_0_20px_hsl(150_70%_50%/0.3)]",
                wrong && "border-destructive bg-destructive/10 text-destructive",
              )}
            >
              <span>{opt}</span>
              {correct && <Check className="h-4 w-4" />}
              {wrong && <X className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}

/* --- Flashcard --- */
export function Flashcard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group relative block h-48 w-full"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "" }}
      >
        <GlassCard
          strong
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Вопрос</div>
          <div className="text-xl font-semibold text-foreground">Что такое переменная?</div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-primary">
            <RotateCw className="h-3 w-3" /> Нажмите чтобы перевернуть
          </div>
        </GlassCard>
        <GlassCard
          strong
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-primary-soft p-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-2 text-xs uppercase tracking-wider text-primary">Ответ</div>
          <div className="text-base text-foreground">
            Именованное место в памяти для хранения значений, которые можно изменять.
          </div>
        </GlassCard>
      </div>
    </button>
  );
}

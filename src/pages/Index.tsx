import { useEffect, useState } from "react";
import { ArrowRight, Paperclip, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { useI18n } from "@/lib/i18n";
import { exampleTopics } from "@/lib/mock-data";

const placeholders = [
  "Основы Python с задачами на компиляторе...",
  "Английский B2: грамматика и диалоги...",
  "Личные финансы: бюджет и инвестиции...",
  "Введение в Machine Learning...",
  "Теория музыки за 30 уроков...",
];

const Index = () => {
  const { t } = useI18n();
  const [topic, setTopic] = useState("");
  const [phIndex, setPhIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhIndex((i) => (i + 1) % placeholders.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-8">
      {/* Hero glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="w-full max-w-3xl animate-fade-in-up">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by Fill AI · Adaptive learning
          </div>
        </div>

        <h1 className="text-center text-5xl font-light leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {t("hero.title")}{" "}
          <span className="gradient-text font-semibold italic">{t("hero.title.accent")}</span>
          <br />
          {t("hero.title.tail")}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("hero.subtitle")}
        </p>

        {/* Input card */}
        <GlassCard strong className="group mt-10 p-2 transition-smooth focus-within:border-primary/60 focus-within:shadow-[0_0_50px_hsl(258_90%_66%/0.25)]">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={placeholders[phIndex]}
            rows={3}
            className="block w-full resize-none border-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <div className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
            <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground">
              <Paperclip className="h-4 w-4" /> {t("hero.attach")}
            </button>
            <GradientButton size="md" disabled={topic.trim().length === 0}>
              {t("hero.create")} <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </GlassCard>

        <p className="mt-4 text-center text-xs text-muted-foreground">{t("hero.hint")}</p>

        {/* Examples */}
        <div className="mt-12">
          <div className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("hero.examples")}
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {exampleTopics.map((ex) => {
              const Icon = ex.icon;
              return (
                <button
                  key={ex.label}
                  onClick={() => setTopic(ex.label)}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-2 text-sm text-foreground/80 transition-smooth hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/60 hover:text-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {ex.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

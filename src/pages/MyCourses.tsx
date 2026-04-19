import { useMemo, useState } from "react";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseCard } from "@/components/CourseCard";
import { GradientButton } from "@/components/GradientButton";
import { useI18n } from "@/lib/i18n";
import { courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const MyCourses = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<"all" | "in-progress" | "completed">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (tab === "in-progress" && c.status !== "in-progress") return false;
      if (tab === "completed" && c.progress !== 100) return false;
      if (q && !c.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [tab, q]);

  const tabs = [
    { id: "all" as const, label: t("my.all"), count: courses.length },
    { id: "in-progress" as const, label: t("my.inprogress"), count: courses.filter((c) => c.status === "in-progress").length },
    { id: "completed" as const, label: t("my.completed"), count: courses.filter((c) => c.progress === 100).length },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("my.title")}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {courses.length} курсов · {courses.filter((c) => c.progress === 100).length} завершено
          </p>
        </div>
        <Link to="/">
          <GradientButton size="md">
            <Plus className="h-4 w-4" /> Новый курс
          </GradientButton>
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 animate-fade-in">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("my.search")}
            className="h-11 w-full rounded-xl border border-border bg-secondary/40 pl-10 pr-16 text-sm text-foreground placeholder:text-muted-foreground/70 backdrop-blur-md transition-smooth focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 text-sm text-foreground/80 transition-smooth hover:bg-secondary">
          <SlidersHorizontal className="h-4 w-4" /> Фильтры
        </button>
      </div>

      <div className="mb-8 inline-flex rounded-xl border border-border bg-secondary/30 p-1 backdrop-blur-md">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-smooth",
              tab === tb.id
                ? "bg-gradient-primary text-white shadow-[0_0_20px_hsl(258_90%_66%/0.4)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tb.label} <span className="ml-1 opacity-70">{tb.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary-soft">
            <Plus className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mb-1.5 text-lg font-semibold text-foreground">{t("my.empty.title")}</h3>
          <p className="mb-6 text-sm text-muted-foreground">{t("my.empty.desc")}</p>
          <Link to="/">
            <GradientButton>{t("my.empty.cta")}</GradientButton>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

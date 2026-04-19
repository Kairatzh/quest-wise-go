import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, X, CheckCircle2, Circle, Clock } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { CodeBlock, QuizBlock, Flashcard } from "@/components/InteractiveBlocks";
import { courses } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const lessons = [
  { id: 1, title: "Введение в Python", duration: "8 мин", done: true },
  { id: 2, title: "Переменные и типы данных", duration: "12 мин", done: true },
  { id: 3, title: "Условия и циклы", duration: "15 мин", done: false, current: true },
  { id: 4, title: "Функции", duration: "18 мин", done: false },
  { id: 5, title: "Списки и словари", duration: "20 мин", done: false },
  { id: 6, title: "Работа с файлами", duration: "15 мин", done: false },
];

const CourseView = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const course = courses.find((c) => c.id === id) ?? courses[0];
  const [activeLesson, setActiveLesson] = useState(3);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Topbar */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-border/50 bg-background/70 px-4 backdrop-blur-xl sm:px-6">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Link to="/courses" className="text-muted-foreground transition-smooth hover:text-foreground">
            Мои курсы
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="truncate font-medium text-foreground">{course.title}</span>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-smooth hover:bg-secondary"
        >
          <X className="h-3.5 w-3.5" /> {t("course.exit")}
        </Link>
      </header>

      <div className="flex flex-1">
        {/* Lessons sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-border/50 bg-background/40 p-4 lg:block">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("course.lessons")}</div>
            <div className="mt-1 text-base font-semibold text-foreground line-clamp-2">{course.title}</div>
          </div>
          <div className="space-y-1.5">
            {lessons.map((l) => {
              const active = l.id === activeLesson;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveLesson(l.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border border-transparent p-3 text-left transition-smooth",
                    active && "border-primary/40 bg-gradient-primary-soft",
                    !active && "hover:bg-secondary/50",
                  )}
                >
                  {l.done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <Circle className={cn("mt-0.5 h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                  )}
                  <div className="min-w-0">
                    <div className={cn("text-sm font-medium", active ? "text-foreground" : "text-foreground/80")}>
                      {l.title}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {l.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Lesson content */}
        <div className="flex-1">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 lg:py-14 animate-fade-in-up">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
              Урок 3 из 6 · 15 мин
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Условия и циклы
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              В этом уроке вы научитесь управлять потоком выполнения программы с помощью условных операторов
              и циклов. ИИ подберёт интерактивные задачи под ваш темп обучения.
            </p>

            <div className="prose prose-invert mt-8 max-w-none">
              <h2 className="mb-3 text-xl font-semibold text-foreground">Условный оператор if</h2>
              <p className="text-foreground/80 leading-relaxed">
                Оператор <code className="rounded bg-secondary px-1.5 py-0.5 text-sm text-primary">if</code> выполняет
                блок кода только если условие истинно. Попробуйте запустить пример ниже:
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <CodeBlock initial={`age = 18\nif age >= 18:\n    print('Доступ разрешён')\nelse:\n    print('Доступ запрещён')`} />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">Проверьте себя</h3>
                <QuizBlock />
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">Карточка для запоминания</h3>
                <Flashcard />
              </div>
            </div>

            {/* Footer nav */}
            <div className="mt-12 flex items-center justify-between gap-3 border-t border-border/50 pt-6">
              <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-smooth hover:bg-secondary">
                <ArrowLeft className="h-4 w-4" /> {t("course.back")}
              </button>
              <div className="hidden text-xs text-muted-foreground sm:block">
                Прогресс модуля: <span className="font-semibold text-foreground">50%</span>
              </div>
              <GradientButton>
                {t("course.next")} <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;

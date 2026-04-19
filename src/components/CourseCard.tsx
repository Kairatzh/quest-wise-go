import { Link } from "react-router-dom";
import { Clock, BookOpen, MoreHorizontal, Play, CheckCircle2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Course } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const levelStyles = {
  beginner: "bg-success/15 text-success border-success/30",
  intermediate: "bg-warning/15 text-warning border-warning/30",
  advanced: "bg-destructive/15 text-destructive border-destructive/30",
};

const levelLabels = { beginner: "Начальный", intermediate: "Средний", advanced: "Продвинутый" };

export function CourseCard({ course }: { course: Course }) {
  const { t } = useI18n();
  const Icon = course.icon;
  const completed = course.progress === 100;

  return (
    <GlassCard hover className="group flex flex-col overflow-hidden">
      <div className={cn("relative h-32 overflow-hidden bg-gradient-to-br", course.gradient)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <Icon className="absolute -bottom-4 -right-4 h-32 w-32 text-white/15" strokeWidth={1.5} />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            {course.category}
          </span>
        </div>
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-md",
            levelStyles[course.level],
          )}
        >
          {levelLabels[course.level]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-lg font-semibold leading-tight text-foreground line-clamp-1">{course.title}</h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{course.description}</p>

        <div className="mb-4 mt-auto">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Прогресс</span>
            <span className="font-semibold text-foreground">{course.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-primary transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.lessons}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <Link
              to={`/course/${course.id}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-smooth",
                completed
                  ? "bg-success/15 text-success hover:bg-success/25"
                  : "bg-gradient-primary text-white hover:shadow-[0_0_20px_hsl(258_90%_66%/0.5)]",
              )}
            >
              {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {completed ? "Повторить" : t("my.continue")}
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

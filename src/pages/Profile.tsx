import { useState } from "react";
import { Sparkles, Flame, CheckCircle2, Clock, Settings, LogOut, Trophy } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { useI18n } from "@/lib/i18n";
import { stats, recentActivity, achievements, courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/CourseCard";

const Profile = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<"overview" | "learning" | "achievements" | "analytics">("overview");
  const xpPct = (stats.xpInLevel / stats.xpToNext) * 100;

  const tabs = [
    { id: "overview" as const, label: t("profile.tabs.overview") },
    { id: "learning" as const, label: t("profile.tabs.learning") },
    { id: "achievements" as const, label: t("profile.tabs.achievements") },
    { id: "analytics" as const, label: t("profile.tabs.analytics") },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
      {/* Header */}
      <GlassCard strong className="mb-6 overflow-hidden p-6 sm:p-8 animate-fade-in">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 shrink-0 rounded-full bg-gradient-primary p-[3px] animate-pulse-glow">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-card text-3xl font-bold text-foreground">
                А
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-white shadow-lg">
                {stats.level}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Алекс Петров</h1>
              <p className="text-sm text-muted-foreground">alex@fillai.app · с апреля 2025</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" /> {t("profile.level")} {stats.level} · Pro Learner
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 text-sm font-medium text-foreground/90 transition-smooth hover:bg-secondary">
              <Settings className="h-4 w-4" /> {t("profile.edit")}
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 text-sm font-medium text-muted-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4" /> {t("profile.logout")}
            </button>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("profile.xp")}</span>
            <span className="font-semibold text-foreground">
              {stats.xpInLevel} / {stats.xpToNext} XP
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-primary shadow-[0_0_20px_hsl(258_90%_66%/0.5)] transition-all"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
        <StatCard icon={Sparkles} label={t("profile.stats.xp")} value={stats.totalXp.toLocaleString()} trend="+1240" accent="primary" />
        <StatCard icon={Flame} label={t("profile.stats.streak")} value={stats.streak} trend="🔥" accent="warning" />
        <StatCard icon={CheckCircle2} label={t("profile.stats.completed")} value={stats.completed} trend="+2" accent="success" />
        <StatCard icon={Clock} label={t("profile.stats.hours")} value={stats.hours} trend="+12ч" accent="accent" />
      </div>

      {/* Tabs */}
      <div className="mb-6 inline-flex flex-wrap rounded-xl border border-border bg-secondary/30 p-1 backdrop-blur-md">
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
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3 animate-fade-in">
          <GlassCard className="p-6 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t("profile.recent")}</h3>
            <div className="space-y-3">
              {recentActivity.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.id} className="flex items-start gap-3 rounded-xl p-3 transition-smooth hover:bg-secondary/40">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary-soft text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{a.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.time}
                        {a.course && ` · ${a.course}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Топ достижений</h3>
            </div>
            <div className="space-y-3">
              {achievements.filter((a) => a.unlocked).slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl bg-secondary/40 p-3">
                  <div className="text-2xl">{a.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "learning" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {courses.filter((c) => c.status === "in-progress").map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}

      {tab === "achievements" && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in">
          {achievements.map((a) => (
            <GlassCard
              key={a.id}
              className={cn(
                "flex flex-col items-center p-6 text-center transition-smooth",
                !a.unlocked && "opacity-50 grayscale",
                a.rare && a.unlocked && "shadow-[0_0_30px_hsl(290_85%_65%/0.25)] border-accent/40",
              )}
            >
              <div className={cn("mb-3 text-5xl", !a.unlocked && "blur-[2px]")}>{a.icon}</div>
              <div className="text-sm font-semibold text-foreground">{a.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{a.desc}</div>
              {a.rare && (
                <span className="mt-3 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                  Редкое
                </span>
              )}
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "analytics" && (
        <GlassCard className="p-6 animate-fade-in">
          <h3 className="mb-5 text-lg font-semibold text-foreground">Активность за 12 недель</h3>
          <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] gap-1.5">
            {Array.from({ length: 84 }).map((_, i) => {
              const intensity = Math.floor(Math.random() * 5);
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-md transition-smooth hover:scale-110",
                    intensity === 0 && "bg-secondary/40",
                    intensity === 1 && "bg-primary/20",
                    intensity === 2 && "bg-primary/40",
                    intensity === 3 && "bg-primary/70",
                    intensity === 4 && "bg-gradient-primary",
                  )}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
            <span>Меньше</span>
            <div className="h-3 w-3 rounded bg-secondary/40" />
            <div className="h-3 w-3 rounded bg-primary/30" />
            <div className="h-3 w-3 rounded bg-primary/60" />
            <div className="h-3 w-3 rounded bg-gradient-primary" />
            <span>Больше</span>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default Profile;

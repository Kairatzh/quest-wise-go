import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "ru" | "en";

const dict = {
  ru: {
    "nav.new": "Новый курс",
    "nav.my": "Мои курсы",
    "nav.profile": "Профиль",
    "nav.collapse": "Свернуть",
    "hero.title": "Что хотите",
    "hero.title.accent": "изучить",
    "hero.title.tail": "сегодня?",
    "hero.subtitle": "ИИ создаст для вас интерактивный курс под любую тему — с задачами, кодом и квизами.",
    "hero.placeholder": "Например: основы Python с задачами на компиляторе...",
    "hero.create": "Создать курс",
    "hero.attach": "Прикрепить",
    "hero.hint": "ИИ сам подберёт формат: код, квизы, карточки или диаграммы",
    "hero.examples": "Популярные темы",
    "my.title": "Мои курсы",
    "my.search": "Поиск курсов...",
    "my.all": "Все",
    "my.inprogress": "В процессе",
    "my.completed": "Завершённые",
    "my.empty.title": "Пока нет курсов",
    "my.empty.desc": "Создайте свой первый интерактивный курс",
    "my.empty.cta": "Создать первый курс",
    "my.continue": "Продолжить",
    "profile.edit": "Редактировать",
    "profile.logout": "Выйти",
    "profile.level": "Уровень",
    "profile.xp": "XP до следующего уровня",
    "profile.stats.xp": "Всего XP",
    "profile.stats.streak": "Дней подряд",
    "profile.stats.completed": "Курсов завершено",
    "profile.stats.hours": "Часов обучения",
    "profile.tabs.overview": "Обзор",
    "profile.tabs.learning": "Обучение",
    "profile.tabs.created": "Созданные",
    "profile.tabs.achievements": "Достижения",
    "profile.tabs.analytics": "Аналитика",
    "profile.recent": "Недавняя активность",
    "course.back": "Назад",
    "course.next": "Дальше",
    "course.exit": "Выйти из курса",
    "course.lessons": "Уроки",
    "course.run": "Запустить",
    "course.check": "Проверить",
    "course.flip": "Перевернуть",
  },
  en: {
    "nav.new": "New course",
    "nav.my": "My courses",
    "nav.profile": "Profile",
    "nav.collapse": "Collapse",
    "hero.title": "What do you want to",
    "hero.title.accent": "learn",
    "hero.title.tail": "today?",
    "hero.subtitle": "AI will craft an interactive course on any topic — with tasks, code and quizzes.",
    "hero.placeholder": "For example: Python basics with compiler challenges...",
    "hero.create": "Create course",
    "hero.attach": "Attach",
    "hero.hint": "AI picks the right format: code, quizzes, flashcards or diagrams",
    "hero.examples": "Popular topics",
    "my.title": "My courses",
    "my.search": "Search courses...",
    "my.all": "All",
    "my.inprogress": "In progress",
    "my.completed": "Completed",
    "my.empty.title": "No courses yet",
    "my.empty.desc": "Create your first interactive course",
    "my.empty.cta": "Create first course",
    "my.continue": "Continue",
    "profile.edit": "Edit",
    "profile.logout": "Logout",
    "profile.level": "Level",
    "profile.xp": "XP to next level",
    "profile.stats.xp": "Total XP",
    "profile.stats.streak": "Day streak",
    "profile.stats.completed": "Completed",
    "profile.stats.hours": "Hours learned",
    "profile.tabs.overview": "Overview",
    "profile.tabs.learning": "Learning",
    "profile.tabs.created": "Created",
    "profile.tabs.achievements": "Achievements",
    "profile.tabs.analytics": "Analytics",
    "profile.recent": "Recent activity",
    "course.back": "Back",
    "course.next": "Next",
    "course.exit": "Exit course",
    "course.lessons": "Lessons",
    "course.run": "Run",
    "course.check": "Check",
    "course.flip": "Flip",
  },
} as const;

type Key = keyof typeof dict["ru"];

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("fillai-lang") as Lang) || "ru");
  useEffect(() => {
    localStorage.setItem("fillai-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => setLangState(l);
  const t = (k: Key) => dict[lang][k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}

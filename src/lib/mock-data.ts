import { Code2, Languages, BarChart3, Brain, Palette, Music, Dumbbell, Briefcase, Sparkles, BookOpen } from "lucide-react";

export type Level = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: typeof Code2;
  level: Level;
  progress: number;
  duration: string;
  lessons: number;
  gradient: string;
  status: "in-progress" | "completed" | "new";
}

export const exampleTopics = [
  { label: "Python с нуля", icon: Code2 },
  { label: "Английский B2", icon: Languages },
  { label: "Финансы и инвестиции", icon: BarChart3 },
  { label: "Машинное обучение", icon: Brain },
  { label: "UI/UX дизайн", icon: Palette },
  { label: "Теория музыки", icon: Music },
  { label: "Силовые тренировки", icon: Dumbbell },
  { label: "Лидерство", icon: Briefcase },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Python для начинающих",
    description: "Освойте основы программирования с интерактивным компилятором",
    category: "Программирование",
    icon: Code2,
    level: "beginner",
    progress: 65,
    duration: "12 ч",
    lessons: 24,
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Английский: разговорный уровень",
    description: "Карточки, квизы и диалоги для уверенной речи",
    category: "Языки",
    icon: Languages,
    level: "intermediate",
    progress: 40,
    duration: "20 ч",
    lessons: 36,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Личные финансы",
    description: "Бюджет, сбережения и базовые инвестиции",
    category: "Финансы",
    icon: BarChart3,
    level: "beginner",
    progress: 100,
    duration: "6 ч",
    lessons: 14,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    status: "completed",
  },
  {
    id: "4",
    title: "Введение в Machine Learning",
    description: "Концепции, диаграммы и практические задачи",
    category: "AI",
    icon: Brain,
    level: "advanced",
    progress: 15,
    duration: "30 ч",
    lessons: 48,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    status: "in-progress",
  },
  {
    id: "5",
    title: "Основы UI/UX дизайна",
    description: "Принципы, цвет, типографика и интерактивные кейсы",
    category: "Дизайн",
    icon: Palette,
    level: "beginner",
    progress: 0,
    duration: "10 ч",
    lessons: 20,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    status: "new",
  },
  {
    id: "6",
    title: "Эффективное лидерство",
    description: "Сценарии, кейсы и рефлексия для управленцев",
    category: "Бизнес",
    icon: Briefcase,
    level: "intermediate",
    progress: 80,
    duration: "8 ч",
    lessons: 16,
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    status: "in-progress",
  },
];

export const stats = {
  totalXp: 12450,
  streak: 23,
  completed: 7,
  hours: 86,
  level: 14,
  xpInLevel: 450,
  xpToNext: 1000,
};

export const recentActivity = [
  { id: 1, icon: Sparkles, text: "Завершён урок «Условия в Python»", time: "2 ч назад", course: "Python для начинающих" },
  { id: 2, icon: BookOpen, text: "Создан курс «Личные финансы»", time: "Вчера", course: "Финансы" },
  { id: 3, icon: Sparkles, text: "Получено достижение «Неделя подряд»", time: "2 дня назад", course: "" },
  { id: 4, icon: BookOpen, text: "Завершён курс «Личные финансы»", time: "3 дня назад", course: "Финансы" },
];

export const achievements = [
  { id: 1, name: "Первый шаг", desc: "Завершите первый урок", icon: "🎯", unlocked: true, rare: false },
  { id: 2, name: "Неделя подряд", desc: "7 дней обучения", icon: "🔥", unlocked: true, rare: false },
  { id: 3, name: "Полиглот", desc: "3 языковых курса", icon: "🌍", unlocked: true, rare: true },
  { id: 4, name: "Кодер", desc: "100 задач по коду", icon: "💻", unlocked: true, rare: false },
  { id: 5, name: "Марафонец", desc: "30 дней подряд", icon: "🏃", unlocked: false, rare: true },
  { id: 6, name: "Эксперт", desc: "Завершите 25 курсов", icon: "🏆", unlocked: false, rare: true },
  { id: 7, name: "Ночная сова", desc: "Учитесь после полуночи", icon: "🦉", unlocked: true, rare: false },
  { id: 8, name: "Мастер", desc: "100 000 XP", icon: "👑", unlocked: false, rare: true },
];

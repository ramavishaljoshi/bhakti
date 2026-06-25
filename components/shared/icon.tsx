import {
  CircleDot,
  BookOpen,
  Sparkles,
  Landmark,
  PartyPopper,
  BookText,
  Newspaper,
  Heart,
  Bot,
  Moon,
  Star,
  Clock,
  Sunrise,
  Sunset,
  Library,
  ScrollText,
  NotebookPen,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  CircleDot,
  BookOpen,
  Sparkles,
  Landmark,
  PartyPopper,
  BookText,
  Newspaper,
  Heart,
  Bot,
  Moon,
  Star,
  Clock,
  Sunrise,
  Sunset,
  Library,
  ScrollText,
  NotebookPen,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}

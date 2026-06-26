import {
  Sparkles,
  Moon,
  Star,
  Clock,
  Sunrise,
  Sunset,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import {
  OmIcon,
  DiyaIcon,
  LotusIcon,
  TempleIcon,
  MalaIcon,
  ConchIcon,
  TrishulIcon,
  ScrollIcon,
  PalmLeafBookIcon,
  QuillIcon,
  FlameIcon,
  SageIcon,
  JournalIcon,
  HeartLotusIcon,
} from "./spiritual-icons";

type AnyIcon =
  | LucideIcon
  | ((props: SVGProps<SVGSVGElement>) => JSX.Element);

const map: Record<string, AnyIcon> = {
  // Shortcut icons — hand-drawn, devotional style
  CircleDot: MalaIcon,
  BookOpen: OmIcon,
  Library: PalmLeafBookIcon,
  Landmark: TempleIcon,
  PartyPopper: DiyaIcon,
  ScrollText: ScrollIcon,
  BookText: ConchIcon,
  Newspaper: QuillIcon,
  Heart: HeartLotusIcon,
  Bot: SageIcon,
  NotebookPen: JournalIcon,
  Sparkles: LotusIcon,
  Flame: FlameIcon,
  Trishul: TrishulIcon,
  Lotus: LotusIcon,

  // Panchang / utility — keep Lucide
  Moon,
  Star,
  Clock,
  Sunrise,
  Sunset,
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

import { MhahPanchang } from "mhah-panchang";
import type { PanchangItem } from "@/lib/data/misc";

const IST_TZ = "Asia/Kolkata";

// Default reference location: New Delhi (used when no location is provided).
export const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.209, label: "New Delhi" };

// Rahu Kaal occupies one of the 8 equal segments of daytime (sunrise -> sunset).
// Which segment depends on the weekday. Index = JS day-of-week (0 = Sunday).
// Values are 1-indexed segment numbers.
const RAHU_KAAL_SEGMENT = [8, 2, 7, 5, 6, 4, 3];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: IST_TZ,
  }).format(date);
}

function istWeekday(date: Date): number {
  const short = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: IST_TZ,
  }).format(date);
  return WEEKDAY_INDEX[short] ?? date.getDay();
}

function rahuKaal(sunRise: Date, sunSet: Date): string {
  const segment = (sunSet.getTime() - sunRise.getTime()) / 8;
  const segmentNo = RAHU_KAAL_SEGMENT[istWeekday(sunRise)] - 1;
  const start = new Date(sunRise.getTime() + segmentNo * segment);
  const end = new Date(start.getTime() + segment);
  return `${formatTime(start)} – ${formatTime(end)}`;
}

/**
 * Compute today's Panchang values for a given location, mapped onto the
 * same label / icon / colour template used across the app.
 */
export function computePanchang(
  date: Date,
  lat: number = DEFAULT_LOCATION.lat,
  lng: number = DEFAULT_LOCATION.lng
): PanchangItem[] {
  const obj = new MhahPanchang();
  const cal = obj.calendar(date, lat, lng);
  const sun = obj.sunTimer(date, lat, lng);

  const sunRise: Date = sun.sunRise;
  const sunSet: Date = sun.sunSet;

  const tithi = cal?.Tithi?.name_en_IN ?? "—";
  const paksha = cal?.Paksha?.name_en_IN;
  const nakshatra = cal?.Nakshatra?.name_en_IN ?? "—";

  return [
    {
      label: "Tithi",
      value: paksha ? `${paksha} ${tithi}` : tithi,
      icon: "Moon",
      color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      label: "Nakshatra",
      value: nakshatra,
      icon: "Star",
      color: "text-sky-500 bg-sky-100 dark:bg-sky-900/30",
    },
    {
      label: "Rahu Kaal",
      value: rahuKaal(sunRise, sunSet),
      icon: "Clock",
      color: "text-rose-500 bg-rose-100 dark:bg-rose-900/30",
    },
    {
      label: "Sunrise",
      value: formatTime(sunRise),
      icon: "Sunrise",
      color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Sunset",
      value: formatTime(sunSet),
      icon: "Sunset",
      color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30",
    },
  ];
}

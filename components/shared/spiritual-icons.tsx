import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function OmIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="16"
        fontFamily="serif"
        fontWeight="500"
        stroke="none"
        fill="currentColor"
      >
        ॐ
      </text>
    </svg>
  );
}

export function DiyaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 4c-.4 1.2-.2 2.4 1 3.5 1.2 1.1 1.4 2.3 1 3.5" />
      <path d="M12 7c.6-.4 1-1 1-1.8" />
      <path d="M3 14c1.5 2.5 5 4 9 4s7.5-1.5 9-4z" />
      <path d="M5 14h14" />
      <circle cx="12" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LotusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 6c1.5 2 1.5 5 0 7-1.5-2-1.5-5 0-7z" />
      <path d="M6 8.5c2 1 3.5 3 4.5 5-2.2.2-4.3-.5-5.5-2 .2-1.2.5-2.2 1-3z" />
      <path d="M18 8.5c-2 1-3.5 3-4.5 5 2.2.2 4.3-.5 5.5-2-.2-1.2-.5-2.2-1-3z" />
      <path d="M3 12c2 3 6 5 9 5s7-2 9-5" />
      <path d="M5 14c1 2 4 3 7 3s6-1 7-3" />
    </svg>
  );
}

export function TempleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2l1 2-1 1-1-1z" />
      <path d="M12 5v2" />
      <path d="M9 9l3-3 3 3v3H9z" />
      <path d="M8 12h8v2H8z" />
      <path d="M7 14h10v2H7z" />
      <path d="M6 16h12v5H6z" />
      <path d="M11 16v5" />
      <path d="M13 16v5" />
    </svg>
  );
}

export function MalaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ConchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 18c-1-3 1-7 4-9 3-2 7-2 9 0" />
      <path d="M7 17c-.5-2 1-5 3.5-6.5C13 9 16 9 17.5 10.5" />
      <path d="M9 16c0-1.5 1-3 2.5-3.5 1.5-.5 3 0 3.5 1" />
      <path d="M18 9c1 1 1.5 2 1.5 3l-2 .5" />
      <path d="M4 18h7" />
    </svg>
  );
}

export function TrishulIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18" />
      <path d="M7 3v5c0 1.5 1 3 2.5 3.5" />
      <path d="M17 3v5c0 1.5-1 3-2.5 3.5" />
      <path d="M12 3l-2 2M12 3l2 2" />
      <path d="M7 3l-1.5 2M7 3l1.5 2" />
      <path d="M17 3l-1.5 2M17 3l1.5 2" />
      <path d="M10 16h4" />
      <path d="M9 19h6" />
    </svg>
  );
}

export function ScrollIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5c0-1.1.9-2 2-2h10c-.6 0-1 .9-1 2v14c0 1.1-.9 2-2 2H6c1.1 0 2-.9 2-2V5z" />
      <path d="M17 3c1.1 0 2 .9 2 2v2h-3" />
      <path d="M8 21c-1.1 0-2-.9-2-2v-2h3" />
      <path d="M10 8h4" />
      <path d="M10 11h4" />
      <path d="M10 14h2" />
    </svg>
  );
}

export function PalmLeafBookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18v3H3z" />
      <path d="M3 11h18v3H3z" />
      <path d="M3 16h18v3H3z" />
      <path d="M12 6v13" />
      <circle cx="6" cy="7.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="7.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="6" cy="12.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="6" cy="17.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="17.5" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function QuillIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 3c-3 1-7 4-10 8-1 1.5-2 3.5-2 5l2-1 3-1.5" />
      <path d="M19 3c-1 3-2 5-4 7" />
      <path d="M9 15l-5 5" />
      <path d="M4 20h6" />
    </svg>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c0 3-3 4-3 7 0 1.5 1 3 3 3s3-1.5 3-3c0-1.5-1-2-1-3" />
      <path d="M7 14c0 3 2 6 5 6s5-3 5-6c0-2-1-3.5-2.5-4.5" />
    </svg>
  );
}

export function SageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M9 8c-1-2 0-4 3-4s4 2 3 4" />
      <path d="M10 11c.5.5 1 .7 2 .7s1.5-.2 2-.7" />
      <path d="M11 9.5h.01M13 9.5h.01" />
      <path d="M8 13c-1.5 1-3 2-3 4 0 2 2 4 7 4s7-2 7-4c0-2-1.5-3-3-4" />
      <path d="M9 14c.5 2 1.5 3 3 3s2.5-1 3-3" />
    </svg>
  );
}

export function JournalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4c0-.55.45-1 1-1h11c.55 0 1 .45 1 1v16c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V4z" />
      <path d="M8 3v18" />
      <path d="M11 8h4" />
      <path d="M11 11h4" />
      <path d="M11 14h3" />
    </svg>
  );
}

export function HeartLotusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
      <path d="M12 12c-1-1-1-2.5 0-3.5 1 1 1 2.5 0 3.5z" />
      <path d="M9 13c-.5-.5-.7-1.5-.3-2.3.8.3 1.3 1 1.3 1.8" />
      <path d="M15 13c.5-.5.7-1.5.3-2.3-.8.3-1.3 1-1.3 1.8" />
    </svg>
  );
}

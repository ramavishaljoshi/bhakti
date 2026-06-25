export function TempleSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 200"
      preserveAspectRatio="xMidYEnd slice"
      className={className}
      aria-hidden
    >
      <g fill="currentColor">
        {/* left small shikhara */}
        <path d="M40 200 L40 130 Q60 90 80 130 L80 200 Z" />
        <rect x="55" y="70" width="10" height="60" rx="3" />
        {/* mid-left tower */}
        <path d="M110 200 L110 110 Q140 50 170 110 L170 200 Z" />
        <rect x="135" y="36" width="10" height="74" rx="3" />
        <circle cx="140" cy="34" r="6" />
        {/* central grand temple */}
        <path d="M230 200 L230 120 L255 120 L255 80 Q300 0 345 80 L345 120 L370 120 L370 200 Z" />
        <rect x="294" y="-6" width="12" height="40" rx="4" />
        <circle cx="300" cy="-10" r="8" />
        {/* right tower */}
        <path d="M420 200 L420 110 Q450 50 480 110 L480 200 Z" />
        <rect x="445" y="40" width="10" height="70" rx="3" />
        <circle cx="450" cy="38" r="6" />
        {/* far right shikhara */}
        <path d="M520 200 L520 135 Q540 95 560 135 L560 200 Z" />
        <rect x="535" y="78" width="10" height="57" rx="3" />
        {/* base platform */}
        <rect x="0" y="186" width="600" height="14" />
      </g>
    </svg>
  );
}

// Small decorative icons (simple drawings, no extra library needed)

function Svg({ children, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function FootstepsIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-14 7 12)">
        <path d="M7 2.5c2 0 3.2 2.3 3.2 5s-.9 4.8-3.2 4.8S3.8 10.2 3.8 7.5 5 2.5 7 2.5z" />
        <rect x="4.6" y="13.3" width="4.8" height="3.6" rx="1.8" />
      </g>
      <g transform="rotate(14 17 12)">
        <path d="M17 6.6c2 0 3.2 2.3 3.2 5s-.9 4.8-3.2 4.8-3.2-2.1-3.2-4.8 1.2-5 3.2-5z" />
        <rect x="14.6" y="17.4" width="4.8" height="3.6" rx="1.8" />
      </g>
    </svg>
  );
}

export function GoalIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </Svg>
  );
}

export function CalendarIcon() {
  return (
    <Svg>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
  );
}

export function StatusIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.7 2.7L16.2 9.5" />
    </Svg>
  );
}

export function GiftIcon() {
  return (
    <Svg>
      <rect x="3.5" y="8.5" width="17" height="4" rx="1" />
      <path d="M5 12.5v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7M12 8.5v12" />
      <path d="M12 8.5S10.8 4 8.3 4a2.2 2.2 0 0 0 0 4.5H12zM12 8.5S13.2 4 15.7 4a2.2 2.2 0 0 1 0 4.5H12z" />
    </Svg>
  );
}

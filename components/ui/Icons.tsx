import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function Solid({ children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Mail = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Stroke>
);

export const MapPin = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M12 21s-6.5-5.2-6.5-10a6.5 6.5 0 1 1 13 0c0 4.8-6.5 10-6.5 10Z" />
    <circle cx="12" cy="11" r="2.5" />
  </Stroke>
);

export const Github = (props: IconProps) => (
  <Solid {...props}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49v-1.9c-2.85.62-3.45-1.2-3.45-1.2-.46-1.18-1.13-1.5-1.13-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.9 1.55 2.37 1.1 2.95.84.09-.66.35-1.1.64-1.36-2.28-.26-4.67-1.14-4.67-5.07 0-1.12.4-2.03 1.05-2.75-.1-.26-.46-1.3.1-2.71 0 0 .86-.28 2.83 1.05a9.75 9.75 0 0 1 5.15 0c1.96-1.33 2.82-1.05 2.82-1.05.57 1.41.21 2.45.1 2.71.66.72 1.05 1.63 1.05 2.75 0 3.94-2.4 4.8-4.69 5.06.36.32.69.94.69 1.9v2.82c0 .27.18.6.7.49A10.2 10.2 0 0 0 12 1.8Z" />
  </Solid>
);

export const Linkedin = (props: IconProps) => (
  <Solid {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.9 9.75h4.15V21H2.9V9.75Zm6.98 0h3.98v1.54h.06a4.36 4.36 0 0 1 3.93-2.16c4.2 0 4.98 2.76 4.98 6.35V21h-4.15v-4.88c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.58V21H9.88V9.75Z" />
  </Solid>
);

export const Send = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M21.5 2.5 10.5 13.5" />
    <path d="M21.5 2.5 15 21.5l-4.5-8-8-4.5 19-6.5Z" />
  </Stroke>
);

export const Loader2 = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M21 12a9 9 0 1 1-6.22-8.56" />
  </Stroke>
);

export const CheckCircle = (props: IconProps) => (
  <Stroke {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
  </Stroke>
);

export const AlertCircle = (props: IconProps) => (
  <Stroke {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5" />
    <path d="M12 16.5h.01" />
  </Stroke>
);

export const ExternalLink = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Stroke>
);

export const Code = (props: IconProps) => (
  <Stroke {...props}>
    <path d="m8.5 8.5-4 3.5 4 3.5" />
    <path d="m15.5 8.5 4 3.5-4 3.5" />
  </Stroke>
);

export const Play = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M7 4.5 19.5 12 7 19.5v-15Z" />
  </Stroke>
);

export const Briefcase = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="2.5" y="7.5" width="19" height="13" rx="2" />
    <path d="M8.5 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2" />
    <path d="M2.5 12.5h19" />
  </Stroke>
);

export const GraduationCap = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M12 3.5 22 8l-10 4.5L2 8l10-4.5Z" />
    <path d="M6 10v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  </Stroke>
);

export const Calendar = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4M16 3v4" />
  </Stroke>
);

export const ChevronDown = (props: IconProps) => (
  <Stroke {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </Stroke>
);

export const ChevronLeft = (props: IconProps) => (
  <Stroke {...props}>
    <path d="m14.5 6-6 6 6 6" />
  </Stroke>
);

export const ArrowRight = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M4 12h15" />
    <path d="m13.5 6.5 6 5.5-6 5.5" />
  </Stroke>
);

export const Menu = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </Stroke>
);

export const X = (props: IconProps) => (
  <Stroke {...props}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </Stroke>
);

export const Sun = (props: IconProps) => (
  <Stroke {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </Stroke>
);

export const Moon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Stroke>
);

export const FileText = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </Stroke>
);

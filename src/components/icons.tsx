// SF Symbols 风格线性图标（内联 SVG，零依赖，描边风格与系统一致）

import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function HouseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 10.4 12 3l9 7.4" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V21" />
    </Icon>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13.2a.8.8 0 0 1 .8.8v14.4a.8.8 0 0 1-.8.8" />
      <path d="M6 17.2h14" />
      <path d="M6 21h14" />
      <path d="M6 21a2 2 0 0 1-2-1.5" />
    </Icon>
  )
}

export function PencilIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20h9" />
      <path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7.5 18.5 3 20l1.5-4.5Z" />
      <path d="m14.9 5.1 3 3" />
    </Icon>
  )
}

export function DocIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 2.5H7a1.5 1.5 0 0 0-1.5 1.5v16A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V7Z" />
      <path d="M14 2.5V7h4.5" />
      <path d="M9 12.5h6M9 16h6" />
    </Icon>
  )
}

export function ChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 4v16h16" />
      <path d="M8.5 16v-5" />
      <path d="M13 16V8" />
      <path d="M17.5 16v-8.5" />
    </Icon>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  )
}

export function RepeatIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m17 2.5 3.5 3.5L17 9.5" />
      <path d="M3.5 11.5V10a4 4 0 0 1 4-4h13" />
      <path d="m7 21.5-3.5-3.5L7 14.5" />
      <path d="M20.5 12.5V14a4 4 0 0 1-4 4h-13" />
    </Icon>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
    </Icon>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a7 7 0 0 0 9.7 9.7Z" />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Icon>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m14.5 5-7 7 7 7" />
    </Icon>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9.5 5 7 7-7 7" />
    </Icon>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Icon>
  )
}

export function TargetIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function BulbIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 18h5" />
      <path d="M10.2 21h3.6" />
      <path d="M12 3a6 6 0 0 0-3.9 10.6c.7.6 1 1.4 1 2.4h5.8c0-1 .3-1.8 1-2.4A6 6 0 0 0 12 3Z" />
    </Icon>
  )
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 5.5v-1a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" transform="translate(1.5 1.5) scale(0.85)" />
    </Icon>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5V15" />
      <path d="m7 10.5 5 5 5-5" />
      <path d="M4 20.5h16" />
    </Icon>
  )
}

export function UploadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 15.5v-12" />
      <path d="m7 8.5 5-5 5 5" />
      <path d="M4 20.5h16" />
    </Icon>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4M16 3v4" />
    </Icon>
  )
}

export function FlagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.5 21.5V3.5" />
      <path d="M5.5 4.5c4.5-2.2 8.5 2 13 0v9c-4.5 2.2-8.5-2-13 0" />
    </Icon>
  )
}

export function XmarkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h16" />
      <path d="m13.5 5.5 6.5 6.5-6.5 6.5" />
    </Icon>
  )
}

export function SparklesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.2l-1.8-5.6L4.5 10.8 10.2 9Z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </Icon>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 9 5-9 5-9-5Z" />
      <path d="m3.5 12.5 8.5 4.7 8.5-4.7" />
      <path d="m3.5 16.5 8.5 4.7 8.5-4.7" />
    </Icon>
  )
}

export function GraduationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5Z" />
      <path d="M6.5 11.5v5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-5" />
      <path d="M21.5 9v5" />
    </Icon>
  )
}

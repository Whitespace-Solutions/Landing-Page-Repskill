import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-hover",
  outline: "border-[1.5px] border-brand-slate bg-white text-ink hover:bg-brand-slate hover:text-white",
  "outline-dark": "border border-white/20 bg-white/5 text-white hover:bg-white/15",
} as const;

const sizes = {
  md: "px-5 py-3 text-[15px]",
  lg: "px-6 py-4 text-base",
} as const;

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  withArrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-button font-semibold transition-colors duration-200 active:translate-y-px",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />}
    </Link>
  );
}

export function ArrowRight({ className, size = 18 }: { className?: string; size?: number }) {
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
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

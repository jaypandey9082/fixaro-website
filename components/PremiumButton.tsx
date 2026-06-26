"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PremiumButtonVariant = "primary" | "secondary" | "ghost" | "gold";

type PremiumButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: PremiumButtonVariant;
  className?: string;
  external?: boolean;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label"> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type" | "disabled">;

const variantClasses: Record<PremiumButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#057B80,#12C7C3)] text-white shadow-[0_0_34px_rgb(18_199_195_/_0.26)] hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgb(18_199_195_/_0.34)]",
  secondary:
    "border border-white/15 bg-white/5 text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] hover:-translate-y-0.5 hover:border-aqua/45 hover:bg-aqua/10",
  ghost: "text-silver hover:bg-white/5 hover:text-aqua",
  gold:
    "bg-[linear-gradient(135deg,#C8A45D,#E1C27A)] text-charcoal shadow-[0_0_30px_rgb(200_164_93_/_0.24)] hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgb(200_164_93_/_0.32)]",
};

export function PremiumButton({
  children,
  href,
  variant = "primary",
  className,
  external,
  type = "button",
  disabled,
  onClick,
  ...props
}: PremiumButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {external ? <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.4} /> : null}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

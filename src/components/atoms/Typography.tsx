import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small"
  children: ReactNode
  className?: string
}

export default function Typography({ variant, children, className }: TypographyProps) {
  const variants = {
    h1: "text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none",
    h2: "text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight",
    h3: "text-2xl md:text-3xl font-normal tracking-tight",
    h4: "text-xl md:text-2xl font-normal",
    body: "text-base leading-relaxed",
    caption: "text-sm text-neutral-400",
    small: "text-xs text-neutral-500",
  }

  const Component = variant === "body" || variant === "caption" || variant === "small" ? "p" : variant

  return <Component className={cn(variants[variant], className)}>{children}</Component>
}

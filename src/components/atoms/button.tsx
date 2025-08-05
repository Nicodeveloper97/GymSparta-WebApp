import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  children: ReactNode
}

export default function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const baseClasses =
    "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-white text-neutral-900 hover:bg-neutral-100 active:bg-white",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-800",
    ghost: "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700",
    outline:
      "border border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800 active:bg-neutral-700",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

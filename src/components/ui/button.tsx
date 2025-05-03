
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-festari-200 bg-transparent text-festari-900 hover:bg-festari-100/10 hover:border-festari-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-festari-accent text-white hover:bg-festari-accent/90 shadow-md",
        highlight: "bg-orange-500 text-white hover:bg-orange-600 shadow-md font-semibold",
        // Modified white button to ensure text contrast
        white: "bg-white text-festari-900 hover:bg-white/90 shadow-sm border border-white/30",
        // Added ghost-light for transparent buttons on dark backgrounds with proper hover state
        "ghost-light": "text-white hover:bg-white/10 hover:text-white",
        // Added transparent variant for buttons on hero sections
        transparent: "bg-transparent border border-white/30 text-white hover:bg-white/10",
        mikado: "bg-mikado text-festari-900 hover:bg-mikado/90 shadow-md font-semibold",
        chili: "bg-chili text-white hover:bg-chili/90 shadow-md font-semibold",
        indigo: "bg-indigo text-white hover:bg-indigo/90 shadow-md font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

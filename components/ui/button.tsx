import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-[#050505] font-display font-semibold rounded-none px-7 py-3 text-base tracking-tight hover:bg-primary/90 transition-colors duration-150 border-0",
        secondary: "bg-surface-2 text-ink hover:bg-surface-1 rounded-none px-7 py-3 text-base border-0",
        ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-surface-2 rounded-none px-7 py-3 text-base border-0",
        danger: "border border-red/40 text-red font-sans rounded-none px-5 py-2 text-sm hover:bg-red/10 transition-colors duration-150 bg-transparent",
        disabled: "bg-surface-2 text-ink-tertiary rounded-none",
        outline: "border border-border text-foreground font-sans rounded-none px-6 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors duration-150 bg-transparent",
      },
      size: {
        default: "h-[44px] px-5 py-2.5 text-[15px] leading-snug rounded-none",
        md: "h-[44px] px-5 py-2.5 text-[15px] leading-snug rounded-none",
        lg: "h-[52px] px-6 py-3.5 text-[16px] leading-snug rounded-none",
        xs: "h-6 px-2 text-xs rounded-none",
        sm: "h-7 px-2.5 text-[0.8rem] rounded-none",
        icon: "size-11 rounded-none",
        "icon-xs": "size-6 rounded-none",
        "icon-sm": "size-7 rounded-none",
        "icon-lg": "size-11 rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)
function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }

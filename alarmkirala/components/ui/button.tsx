import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-signal text-paper hover:bg-signal-dim",
        outline:
          "border border-line text-fg hover:border-fg-soft hover:bg-ink-soft",
        ghost: "text-fg-soft hover:bg-ink-soft hover:text-fg",
        safe: "bg-safe text-ink hover:brightness-110",
        paper: "bg-paper text-ink hover:bg-white",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/** Link olarak render edilen buton görünümü */
export function buttonClasses(
  opts?: VariantProps<typeof buttonVariants> & { className?: string },
) {
  return cn(
    buttonVariants({ variant: opts?.variant, size: opts?.size }),
    opts?.className,
  );
}

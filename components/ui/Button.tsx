import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200 bg-white/90 text-[#03373D] backdrop-blur-md dark:font-medium dark:shadow-sm dark:hover:scale-[1] dark:border-0 dark:backdrop-blur-none dark:transform-none dark:active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 dark:rounded-lg",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 border-destructive dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90 dark:rounded-lg",
        outline:
          "border-gray-200 dark:border dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-muted dark:bg-card dark:text-foreground dark:hover:bg-muted dark:rounded-lg",
        secondary:
          "dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/90 dark:rounded-lg",
        ghost:
          "bg-transparent hover:bg-muted/50 border-none shadow-none hover:shadow-none hover:scale-100 backdrop-blur-none text-foreground dark:bg-transparent dark:text-foreground dark:hover:bg-card dark:shadow-none dark:rounded-lg",
        link: "text-[#03373D] hover:underline shadow-none hover:shadow-none hover:scale-100 border-none bg-transparent backdrop-blur-none dark:text-primary dark:underline-offset-4 dark:hover:underline dark:shadow-none dark:hover:shadow-none dark:rounded-none",
        gradient:
          "dark:bg-gradient-to-r dark:from-primary dark:to-secondary dark:text-primary-foreground dark:hover:from-primary/90 dark:hover:to-secondary/90 dark:rounded-lg",
        success: "bg-green-600 text-white hover:bg-green-700 border-green-600 dark:bg-green-600 dark:text-white dark:hover:bg-green-700 dark:rounded-lg",
      },
      size: {
        default: "h-11 px-8 py-2.5 rounded-full text-sm sm:text-base dark:h-10 dark:px-4 dark:py-2 dark:rounded-lg",
        sm: "h-9 rounded-full px-4 text-xs dark:h-9 dark:rounded-md dark:px-3",
        lg: "h-14 rounded-full px-10 py-4 text-sm sm:text-base dark:h-12 dark:rounded-lg dark:px-8 dark:py-3",
        xl: "h-16 rounded-full px-12 py-5 text-base sm:text-lg dark:h-14 dark:rounded-lg dark:px-10 dark:py-4",
        icon: "h-10 w-10 p-0 rounded-full dark:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ...props,
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

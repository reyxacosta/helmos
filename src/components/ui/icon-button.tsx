import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-muted-foreground transition duration-150 hover:bg-accent hover:text-accent-foreground active:scale-90 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-7 [&_svg]:size-4",
        md: "size-8 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ size }), className)}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

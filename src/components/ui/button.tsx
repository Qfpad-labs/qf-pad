import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-sm font-black uppercase tracking-[0.14em] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-[3px] border-black [box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,12px_12px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#42C9FF] text-black",
        destructive:
          "bg-[#FF7F41] text-black",
        outline:
          "bg-white text-black [background-image:linear-gradient(135deg,rgba(255,255,255,1)_0_46%,rgba(245,238,224,1)_46%_54%,rgba(255,255,255,1)_54%)]",
        secondary:
          "bg-[#B8EF53] text-black",
        ghost:
          "border-[2px] border-dashed border-black bg-[#FFF2D5] [box-shadow:0_0_0_1px_#000,4px_4px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000]",
        link: "border-none shadow-none [box-shadow:none] text-black underline-offset-4 hover:underline hover:translate-x-0 hover:translate-y-0",
      },
      size: {
        default: "h-11 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-3 has-[>svg]:px-3",
        lg: "h-14 px-7 has-[>svg]:px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

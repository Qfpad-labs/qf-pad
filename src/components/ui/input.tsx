import * as React from "react";

import { cn } from "@/lib/utils/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-black placeholder:text-black/50 selection:bg-[#42C9FF] selection:text-black flex h-11 w-full min-w-0 rounded-[2px] border-[3px] border-black bg-white px-3 py-2 text-base [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-bold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-medium",
        "focus-visible:border-[#FF7F41] focus-visible:[box-shadow:0_0_0_1px_#000,0_0_0_4px_#FF7F41]",
        "aria-invalid:border-[#FF7F41] aria-invalid:[box-shadow:0_0_0_1px_#000,0_0_0_4px_#FF7F41]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

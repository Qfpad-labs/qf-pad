import * as React from "react"
import { cn } from "@/lib/utils/utils"

export type TextareaProps =
    React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-[2px] border-[3px] border-black bg-white px-3 py-2 text-sm font-medium [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] placeholder:text-black/50 focus-visible:outline-none focus-visible:border-[#FF7F41] focus-visible:[box-shadow:0_0_0_1px_#000,0_0_0_4px_#FF7F41] disabled:cursor-not-allowed disabled:opacity-50 transition-all selection:bg-[#42C9FF] selection:text-black",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }

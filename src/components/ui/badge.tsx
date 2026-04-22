import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border-[2px] border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] transition-all focus:outline-none [box-shadow:0_0_0_1px_#000,4px_4px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1",
    {
        variants: {
            variant: {
                default:
                    "bg-[#42C9FF] text-black",
                secondary:
                    "bg-[#B8EF53] text-black",
                destructive:
                    "bg-[#FF7F41] text-black",
                outline: "bg-white text-black",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }

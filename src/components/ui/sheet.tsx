import * as React from "react"
import { cn } from "@/lib/utils"

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
      className
    )}
    {...props}
  />
))
Sheet.displayName = "Sheet"

export { Sheet }

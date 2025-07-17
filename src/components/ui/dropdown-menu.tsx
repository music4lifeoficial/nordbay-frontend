import * as React from "react"
import { cn } from "@/lib/utils"

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative inline-block text-left",
      className
    )}
    {...props}
  />
))
DropdownMenu.displayName = "DropdownMenu"

export { DropdownMenu }

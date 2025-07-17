import * as React from "react"
import { cn } from "@/lib/utils"

export interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(({ className, ...props }, ref) => (
  <dialog
    ref={ref}
    className={cn(
      "rounded-lg bg-background p-6 shadow-lg",
      className
    )}
    {...props}
  />
))
Dialog.displayName = "Dialog"

export { Dialog }

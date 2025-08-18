import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-600",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-600",
        info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  type?: "success" | "error" | "warning" | "info";
  message?: string;
  title?: string;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, type, message, title, children, ...props }, ref) => {
    // Map type to variant for backward compatibility
    const mappedVariant = type === "error" ? "destructive" : type === "success" ? "success" : type === "warning" ? "warning" : type === "info" ? "info" : variant;
    
    const Icon = type ? iconMap[type] : null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant: mappedVariant }), className)}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <div>
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">
            {message || children}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };

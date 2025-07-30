import React from "react";
import { cn } from "@/lib/utils";

export type AlertType = "info" | "success" | "warning" | "error";

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  className?: string;
}

const typeStyles: Record<AlertType, string> = {
  info: "bg-blue-50 border-blue-300 text-blue-900",
  success: "bg-green-50 border-green-300 text-green-900",
  warning: "bg-yellow-50 border-yellow-300 text-yellow-900",
  error: "bg-red-50 border-red-300 text-red-900"
};

const typeIcons: Record<AlertType, React.ReactNode> = {
  info: <span aria-hidden="true">ℹ️</span>,
  success: <span aria-hidden="true">✅</span>,
  warning: <span aria-hidden="true">⚠️</span>,
  error: <span aria-hidden="true">❌</span>
};

export const Alert: React.FC<AlertProps> = ({ type = "info", title, message, className }) => (
  <div
    className={cn(
      "flex items-start gap-3 border-l-4 rounded-md p-4 shadow-sm text-sm",
      typeStyles[type],
      className
    )}
    role={type === "error" ? "alert" : "status"}
    aria-live={type === "error" ? "assertive" : "polite"}
  >
    <div className="pt-0.5">{typeIcons[type]}</div>
    <div>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div>{message}</div>
    </div>
  </div>
);

export default Alert;

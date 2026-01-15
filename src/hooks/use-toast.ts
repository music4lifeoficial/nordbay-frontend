import { toast } from "sonner"

type ToastProps = {
  title?: string
  message?: string
  description?: string
  variant?: "default" | "destructive"
  type?: "success" | "error"
}

export const useToast = () => {
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      if (variant === "destructive") {
        toast.error(title || "Error", {
          description,
        })
      } else {
        toast.success(title || "Success", {
          description,
        })
      }
    },
  }
}

// Legacy pushToast function for backward compatibility
export const pushToast = ({ title, message, description, type, variant }: ToastProps) => {
  const content = message || description
  const toastTitle = title || (type === 'error' ? 'Error' : 'Success')
  
  if (type === 'error' || variant === 'destructive') {
    toast.error(toastTitle, {
      description: content,
    })
  } else {
    toast.success(toastTitle, {
      description: content,
    })
  }
}

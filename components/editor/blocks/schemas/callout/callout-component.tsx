import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FC, HTMLAttributes } from "react";

interface CalloutProps {
  icon?: string
  title?: React.ReactNode
  children?: React.ReactNode
}

export function Callout({ title, children, icon, ...props }: HTMLAttributes<HTMLDivElement> & CalloutProps) {
  return (
    <Alert {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="flex flex-col min-w-0 ml-2 w-full">{children}</AlertDescription>
    </Alert>
  )
}
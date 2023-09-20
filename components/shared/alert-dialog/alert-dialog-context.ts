import { createContext } from "react";

export interface AlertDialogProps {
  title: string
  content: string
  cancelText?: string
  okText?: string
  showLoading?: boolean
  okColor?: "primary" | "danger" | "success" | "warning" | "default" | "secondary"
  onConfirm:  () =>  Promise<boolean>
  onCancel?: () => void
}
export const AlertDialogContext = createContext({} as {
  openAlert: (props: AlertDialogProps) => void,
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  onOpenChange: (isOpen: boolean) => void,
  alertDialog: AlertDialogProps | null,
  setAlertDialog: (props: AlertDialogProps) => void,
})
"use client"
import { useCallback, useState } from "react";
import { AlertDialogContext, AlertDialogProps } from "./alert-dialog-context";
import { useDisclosure } from "@nextui-org/react";


export const AlertDialogProvider = ({children}:{
  children: React.ReactNode;
}) => {
  const [alertDialog, setAlertDialog] = useState<AlertDialogProps | null>(null)
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const openAlert = useCallback((props: AlertDialogProps) => {
    setAlertDialog(props)
    onOpen()
  }, [])
  return <AlertDialogContext.Provider value={{
    openAlert,
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    alertDialog,
    setAlertDialog,
  }}>
    {children}
  </AlertDialogContext.Provider>
}


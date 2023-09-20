import { useContext } from "react";
import { AlertDialogContext } from "./alert-dialog-context";

export const useAlertDialog = () => {
  return useContext(AlertDialogContext);
}
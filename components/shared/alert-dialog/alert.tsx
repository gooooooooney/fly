"use client"
import React, { useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useAlertDialog } from "./use-alert-dialog";

export default function AlertDialog() {
  const { isOpen, onOpen, onOpenChange, alertDialog } = useAlertDialog();
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{alertDialog?.title}</ModalHeader>
              <ModalBody>
                {alertDialog?.content}
              </ModalBody>
              <ModalFooter>

                <Button  variant="light" onPress={onClose}>
                  {alertDialog?.cancelText}
                </Button>
                <Button color={alertDialog?.okColor || "primary"} isLoading={!!alertDialog?.showLoading && loading}  onPress={() => {
                  setLoading(true)
                  alertDialog!.onConfirm().finally(() => {
                    setLoading(false)
                    onClose()
                  })
                }}>
                  {alertDialog?.okText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import { Icons } from "@/components/icons";
import { usePageInit } from "@/hooks/use-page-init";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { shareSetting } from "@/lib/data-source/page";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Select, SelectItem, Switch, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

const enum Permission {
  READ = "READ",
  EDIT = "EDIT"
}

export function Share() {
  const pageId = useUuidPathname()
  const { data, mutate } = usePageInit()
  const {isOpen, onClose, onOpenChange} = useDisclosure()
  const [state, copyToClipboard] = useCopyToClipboard()

  if (!data) return
  const setShareEnable = (enabled: boolean) => {
    mutate({
      ...data,
      shareSetting: {
        ...data!.shareSetting!,
        enabled,
      }
    }, {
      revalidate: false,
    })
    shareSetting({
      pageId,
      enabled,
      url: window.location.href
    }).then(res => {
      if (!res.body) {
        toast.error("Fail")
      }
    })
  }
  return (
    <Popover isOpen={isOpen} onOpenChange={onOpenChange} radius="sm">
      <PopoverTrigger>
        <Button color="primary" size="sm" radius="sm" variant="solid">Share</Button>
      </PopoverTrigger>
      <PopoverContent className="w-unit-7xl" >
        {
          !data.shareSetting?.enabled ? (
            <div className="p-4 flex flex-col">
              <p className="mb-4">
                Publish a static website of this page. You can allow others to view, duplicate, and remix.
              </p>
              <Button size="sm" color="primary" radius="sm" variant="solid" onClick={() => {
                setShareEnable(true)
              }} fullWidth>
                Publish
              </Button>
            </div>
          ) : (
            <div className="p-4 w-full ">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-primary my-2 flex  items-center">
                  <Icons.Graphics className="w-4 h-4" />
                  This page is live on the web</p>
                <Switch
                  size="sm"
                  isDisabled
                  classNames={{
                    base: cn(
                      "inline-flex flex-row-reverse w-full max-w-md items-center",
                      "justify-between cursor-pointer rounded-lg ",
                    ),
                    wrapper: cn("mx-0 cursor-not-allowed")
                  }}>
                  Allow editing
                </Switch>
                <div className="flex w-full gap-2 justify-between items-center">
                  <Button
                    onClick={() => {
                      setShareEnable(false)
                    }}
                    fullWidth
                    className="mt-2"
                    size="sm"
                    color="default"
                    radius="sm"
                    variant="solid"
                  >
                    Unpublished
                  </Button>
                  <Button
                    className="mt-2 cursor-copy"
                    size="sm"
                    fullWidth
                    color="primary"
                    radius="sm"
                    variant="solid"
                    onClick={() => {
                      onClose()
                      copyToClipboard(window.location.href)
                      if (state.error) {
                        toast.error("Fail to copy link to clipboard")
                        return
                      }
                      toast.success("Copied link to clipboard")
                    }}
                  >
                    Copy link
                  </Button>
                </div>
              </div>
            </div>
          )
        }
      </PopoverContent>
    </Popover>
  )
}
import { Icons } from "@/components/icons";
import { useAlertDialog } from "@/components/shared/alert-dialog/use-alert-dialog";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { removePage } from "@/lib/data-source/page";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { toast } from "sonner";


interface ActionMenusProps {
  pageId: string
}

export const ActionMenus: FC<HTMLAttributes<HTMLDivElement> & ActionMenusProps> = ({ className, pageId }) => {
  const router = useRouter()
  const { openAlert } = useAlertDialog()
  const handleAction = (key: any) => {
    switch (key) {
      case "remove": {
        openAlert({
          title: "Delete page",
          content: "Are you sure you want to delete this page?",
          okText: "Delete",
          okColor: "danger",
          cancelText: "Cancel",
          onConfirm: () => {
              toast.promise(removePage({
                pageId,
                spaceId: "",
              }), {

                loading: "Deleting...",
                success: () => {
                  setTimeout(() => {
                    router.push("/")
                  }, 1000);
                  return "Delete successfully, redirecting..."

                },
                error: () => {
                  return "Delete failed"
                },
              })
              return Promise.resolve(true)
          }
        })
        // toast.promise(removePage({
        //   pageId,
        //   spaceId: "",
        // }), {
        //   loading: "Deleting...",
        //   success: () => {
        //     setTimeout(() => {
        //       router.push("/")
        //     }, 1000);
        //     return "Delete successfully, redirecting..."

        //   },
        //   error: "Delete failed",
        // })
        break;
      }
      default:
    }
  }
  return (
    <>
      <Dropdown
        radius="sm"
        classNames={{
          base: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger className="px-2 py-1 mx-0 min-w-fit rounded-sm h-auto">
          <Button className={cn("px-0", className)} variant="light" size="sm">
            <Icons.DotsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={handleAction} itemClasses={{
          base: [
            "rounded-sm",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-background-100/80",
            "dark:data-[hover=true]:bg-background-50",
            "data-[selectable=true]:focus:bg-background-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }} aria-label="dropdown action">
          <DropdownSection>
            <DropdownItem
              key="remove"
              startContent={<Icons.TrashIcon />}
            >
              Remove
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>

  )
}
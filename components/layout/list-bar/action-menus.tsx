import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { FC, HTMLAttributes } from "react";


interface ActionMenusProps {
  pageId: string
}

export const ActionMenus: FC<HTMLAttributes<HTMLDivElement> & ActionMenusProps> = ({ className, pageId }) => {
  
  return (
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
      <DropdownMenu itemClasses={{
        base: [
          "rounded-sm",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-default-foreground",
          "data-[hover=true]:bg-default-100/80",
          "dark:data-[hover=true]:bg-default-50",
          "data-[selectable=true]:focus:bg-default-50",
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
  )
}
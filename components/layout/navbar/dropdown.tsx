import { Icons } from "@/components/icons";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { saveProperty } from "@/lib/data-source/page";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { FC } from "react";
import { useStore } from "zustand";

const enum DropdownMenuKeys {
  LOCK = "lock"
}

const DropdownDataMenus = {
  editSection: [
    {
      key: DropdownMenuKeys.LOCK,

    }
  ]
}

export const DropdownMenus: FC = () => {
  const [editable, setEditable] = useStore(useBoundStore, s => [s.editable, s.setEditable])
  const pageId = useUuidPathname()
  const saveEditable = () => {
    setEditable(!editable)
    saveProperty({
      pageId,
      data: {
        editable: !editable
      }
    })
  }
  const handleAction = (key: DropdownMenuKeys) => {
    switch (key) {
      case DropdownMenuKeys.LOCK: {
        saveEditable()
        break;
      }
      default:

    }
  }
  return (
    <Dropdown >
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Icons.DotsHorizontal size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleAction as any} aria-label="edit">
        <DropdownSection>
          <DropdownItem key={DropdownMenuKeys.LOCK}>
            {
              editable ? "Lock page" : "Unlock page"
            }
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
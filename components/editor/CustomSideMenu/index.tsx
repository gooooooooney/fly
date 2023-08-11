import { Icons } from "@/components/icons";
import { SideMenuProps } from "@blocknote/react";
import { CustomBlockSchema } from "../block-schema";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";

export const CustomSideMenu = (props: SideMenuProps<CustomBlockSchema>) => (
  <Dropdown
    placement="left"
    size="sm"
    radius="sm"
    shadow="sm"
    offset={10}
  >

    <DropdownTrigger>
      <div
        className="cursor-move"
        draggable="true"
        onDragStart={props.blockDragStart}
        onDragEnd={props.blockDragEnd}>
        <Icons.DragHandle size={24} />
      </div>
    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions">
      <DropdownItem onClick={() => {
        props.editor.removeBlocks([props.block])
      }} key="delete" className="text-danger" color="danger">
        Delete
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);
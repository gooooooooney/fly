import { Icons } from "@/components/icons"
import { SideMenuProps } from "@blocknote/react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"
import { CustomBlockSchema } from "../blocks/custom-block-schema"

export function DragHandle(props: SideMenuProps<CustomBlockSchema>) {
    return (
        <Dropdown
            placement="left"
            size="sm"
            radius="sm"
            shadow="sm"
            offset={10}
            containerPadding={0}
            classNames={{
                base: "min-w-min p-0",

            }}
            onClose={() => {
                props.unfreezeMenu()
            }}
            onOpenChange={(open) => {
                props.freezeMenu()
                if (open) {
                    // Set the background color to green when the menu is open
                    props.editor.updateBlock(props.block, {
                        props: { backgroundColor: "green", },
                    })
                } else {
                    // Set the background color to transparent when the menu is closed
                    props.editor.updateBlock(props.block, {
                        props: { backgroundColor: "transparent" },
                    })
                }
            }}
            backdrop="opaque"
        >
            <DropdownTrigger>
                <Button
                size="sm"
                    variant="light"
                    isIconOnly
                    draggable="true"
                    onDragStart={props.blockDragStart}
                    onDragEnd={props.blockDragEnd}>
                    <Icons.DragHandle size={24} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu className="p-0" variant="flat" aria-label="Side menu">
                <DropdownItem
                    startContent={<Icons.TrashIcon size={16} />}
                    onClick={() => {
                        props.editor.removeBlocks([props.block])
                    }} key="delete" className="text-danger" color="danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
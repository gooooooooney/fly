"use client"
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Icons } from "./icons";
import EmojiPicker from "./emoji-picker";

function IconAndCover() {

    return (
        <section className="flex items-center">
            <Popover placement="top" isOpen radius="sm">
                <PopoverTrigger >
                    <Button size="sm" variant="light" startContent={<Icons.Face />}>Add icon</Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 items-start">
                    <EmojiPicker />
                </PopoverContent>
            </Popover>
            <Popover placement="top">
                <PopoverTrigger >
                    <Button size="sm" variant="light" startContent={<Icons.ImageIcon />}>Add cover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">Popover Content</div>
                        <div className="text-tiny">This is the popover content</div>
                    </div>
                </PopoverContent>
            </Popover>
        </section>
    )
}

export default IconAndCover
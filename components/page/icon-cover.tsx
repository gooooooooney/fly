"use client"
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import EmojiPicker from "./emoji-picker";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { LIST } from "@/constatns/emojis";
import { Random, cn } from "@/lib/utils";
import ImagePicker from "./image-picker";
import { Icons } from "../icons";
import { covers } from "@/constatns/images/unsplash";





function IconAndCover() {
    const { emoji, setCover, cover, setIcon } = useStore(useBoundStore, (state) => ({
        emoji: state.icon,
        setIcon: state.setIcon,
        cover: state.cover,
        setCover: state.setCover
    }))
    const handleRandomIcon = () => {
        const randomEmojiList = LIST[Random(0, LIST.length - 1)]
        const randomEmoji = randomEmojiList[Random(0, randomEmojiList.length - 1)]
        setIcon(randomEmoji)
    }
    const handleRandomCover = () => {
        const randomCover = covers[Random(0, covers.length - 1)]
        setCover(randomCover.urls.full)
    }
    return (
        <>
            {emoji && <div className={cn(
                "h-18 w-18 relative max-w-full z-10 -mt-[2.2rem]",
                {
                    "mt-24": !cover,
                }
            )}>
                <Popover placement="left" radius="sm">
                    <PopoverTrigger >
                        <Button variant="light" className="text-7xl px-0 h-18 w-18 aria-expanded:opacity-100">{emoji}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 items-start">
                        <EmojiPicker />
                    </PopoverContent>
                </Popover>
            </div>
            }
            <section className="my-2">
                <section className="flex group-hover:opacity-100 transition-opacity opacity-0 items-center">
                    {
                        !emoji && (
                            <Button size="sm" variant="light" onClick={handleRandomIcon} startContent={<Icons.Face />}>Add icon</Button>
                        )
                    }
                    {
                        !cover && (
                            <Button size="sm" variant="light" onClick={handleRandomCover} startContent={<Icons.ImageIcon />}>Add cover</Button>
                        )
                    }
                </section>
            </section>
        </>
    )
}

export default IconAndCover
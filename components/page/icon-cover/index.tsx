"use client";
import { Button } from "@nextui-org/button";
import { randomEmoji } from "./emoji-content/emoji-mart";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { Random, cn } from "@/lib/utils";
import { covers } from "@/constatns/images/unsplash";
import { Icons } from "@/components/icons";
import { useClientInit } from "@/components/useClientInit";
import { saveProperty } from "@/lib/data-source/page";
import { EmojiPicker } from "@/components/emoji-picker";
import { setPropSyncMenus } from "@/lib/menus";

function IconAndCover({ id }: { id: string }) {
  const { emoji, setCover, cover, setIcon } = useBoundStore((state) => ({
    emoji: state.icon,
    setIcon: state.setIcon,
    cover: state.cover,
    setCover: state.setCover,
  }));
  useClientInit(id);

  const setEmoji = (emoji: string) => {
    setIcon(emoji);
    setPropSyncMenus({
      id,
      emoji,
    });
    saveProperty({
      pageId: id,
      data: {
        emoji,
      },
    });
  };
  const handleRandomIcon = () => {
    const emoji = randomEmoji();
    setEmoji(emoji);
  };
  const handleRandomCover = () => {
    const randomCover = covers[Random(0, covers.length - 1)];

    setCover(randomCover.urls.full);
    saveProperty({
      pageId: id,
      data: {
        cover: randomCover.urls.full,
      },
    });
  };
  return (
    <>
      {emoji && (
        <div
          className={cn(
            "h-18 w-18 relative max-w-full z-10 -mt-[2.2rem] inline-block",
            {
              "mt-24": !cover,
            }
          )}
        >
          <EmojiPicker onEmojiSelect={(e) => setEmoji(e)}>
            <Button
              variant="light"
              className="text-7xl px-0 h-18 w-18 aria-expanded:opacity-100"
            >
              {emoji}
            </Button>
          </EmojiPicker>
        </div>
      )}
      <section className="my-2">
        <section className="flex group-hover:opacity-100 transition-opacity opacity-0 items-center">
          {!emoji && (
            <Button
              size="sm"
              variant="light"
              onClick={handleRandomIcon}
              startContent={<Icons.Face />}
            >
              Add icon
            </Button>
          )}
          {!cover && (
            <Button
              size="sm"
              variant="light"
              onClick={handleRandomCover}
              startContent={<Icons.ImageIcon />}
            >
              Add cover
            </Button>
          )}
        </section>
      </section>
    </>
  );
}

export default IconAndCover;

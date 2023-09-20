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
import { usePageInit } from "@/hooks/use-page-init";

function IconAndCover({ id }: { id: string }) {

  const { data, mutate } = usePageInit()
  useClientInit(id);

  if (!data) return null;
  const setEmoji = (emoji: string) => {
    mutate({
      ...data,
      icon: emoji,
    }, { revalidate: false })
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

    mutate({
      ...data,
      cover: randomCover.urls.full,
    }, { revalidate: false })
    saveProperty({
      pageId: id,
      data: {
        cover: randomCover.urls.full,
      },
    });
  };
  return (
    <>
      {data?.icon && (
        <div
          className={cn(
            "h-18 w-18 relative max-w-full z-10 -mt-[2.2rem] inline-block",
            {
              "mt-24": !data?.cover,
            }
          )}
        >
          <EmojiPicker onEmojiSelect={(e) => setEmoji(e)}>
            <Button
              isDisabled={!data?.editable}
              variant="light"
              className="text-7xl px-0 h-18 w-18 aria-expanded:opacity-100 !opacity-100"
            >
              {data?.icon}
            </Button>
          </EmojiPicker>
        </div>
      )}
      <section className="my-2">
        <section className="flex group-hover:opacity-100 transition-opacity opacity-0 items-center">
          {!data?.icon && (
            <Button
              size="sm"
              variant="light"
              onClick={handleRandomIcon}
              startContent={<Icons.Face />}
            >
              Add icon
            </Button>
          )}
          {!data?.cover && (
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

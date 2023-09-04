// import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { EmojiMartPicker } from "./page/icon-cover/emoji-content/emoji-mart";
import { FC, PropsWithChildren } from "react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}
export const EmojiPicker: FC<PropsWithChildren<EmojiPickerProps>> = (props) => {
  return (
    <Popover placement="left" radius="sm">
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent className="w-96 items-start">
        {/* <EmojiPicker /> */}
        <EmojiMartPicker onEmojiSelect={(e) => props.onEmojiSelect(e.native)} />
      </PopoverContent>
    </Popover>
  );
};

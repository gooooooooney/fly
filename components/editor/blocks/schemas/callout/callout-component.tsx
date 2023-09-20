import { EmojiPicker } from "@/components/emoji-picker";
import { EmojiMartPicker } from "@/components/page/icon-cover/emoji-content/emoji-mart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { FC, HTMLAttributes } from "react";

interface CalloutProps {
  icon?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  setEmoji: (emoji: string) => void;
}

export function Callout({
  title,
  children,
  icon,
  setEmoji,
  ...props
}: HTMLAttributes<HTMLDivElement> & CalloutProps) {
  return (
    <Alert {...props}>
      <EmojiPicker onEmojiSelect={(e) => setEmoji(e)}>
          <Button
            variant="light"
            className="text-2xl select-none cursor-pointer px-0 flex items-center justify-center h-6 w-6 rounded-sm mr-2 min-w-0 aria-expanded:opacity-100"
          >
            {icon}
          </Button>
      </EmojiPicker>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="flex flex-col min-w-0 w-full">
        {children}
      </AlertDescription>
    </Alert>
  );
}

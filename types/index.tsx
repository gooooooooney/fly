import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Command = "create" | "update" | "delete"
export type SaveParams = {
  pageId: string
  block: BlockNoteEditor['topLevelBlocks'][number]
  command: Command
}

export type Operation = {
  command: Command,
  arg: BlockNoteEditor['topLevelBlocks'][number]
}

export type SaveRequestData = {
  operations: Operation[]
}
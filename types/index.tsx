import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Command = "create" | "update" | "delete"
export type SaveParams = {
  pageId: string
  operations: Operation
}

export type Operation = {
  // command: Command,
  type: "block"
  arg: BlockNoteEditor['topLevelBlocks']
} | {
  type: "property"
  arg: {
    title?: string
    emoji?: string
    cover?: string
    editable?: boolean
  }

}

export type SaveRequestData = {
  operations: Operation
}
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Command = "insert" | "update" | "delete";
export type SaveBlocksParams = {
  pageId: string;
  blocks: BlockNoteEditor["topLevelBlocks"];
};

export type SavePropertyParams = {
  pageId: string;
  data: {
    title?: string;
    emoji?: string;
    cover?: string;
    editable?: boolean;
  };
};

export interface Operation {
  command: Command;
  data: BlockWithOrder[]
}

export type SaveParams = {
  pageId: string;
  operations: Operation[];

}

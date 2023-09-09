import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Command = "insert" | "update" | "delete";
export type SaveBlocksParams = {
  pageId: string;
  blocks: BlockNoteEditor["topLevelBlocks"];
};
export type PageWidth = "default" | "wide" | "full";
export type SavePropertyParams = {
  pageId: string;
  data: {
    title?: string;
    emoji?: string;
    cover?: string;
    editable?: boolean;
    pageWidth?: PageWidth
  };
};

export interface Operation {
  command: Command;
  data: BlockWithOrder[];
}

export type SaveParams = {
  pageId: string;
  parentId?: string;
  operations: Operation[];
};

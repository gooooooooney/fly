import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Command = "create" | "update" | "delete";
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

import { CustomBlockSchema } from "@/components/editor/blocks/custom-block-schema";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    block: {
      BNCreateBlock: (pos: number) => ReturnType;
      BNDeleteBlock: (posInBlock: number) => ReturnType;
      BNMergeBlocks: (posBetweenBlocks: number) => ReturnType;
      BNSplitBlock: (posInBlock: number, keepType: boolean) => ReturnType;
      BNUpdateBlock: <BSchema extends BlockSchema>(
        posInBlock: number,
        block: PartialBlock<BSchema>
      ) => ReturnType;
      BNCreateOrUpdateBlock: <BSchema extends BlockSchema>(
        posInBlock: number,
        block: PartialBlock<BSchema>
      ) => ReturnType;
    };
  }
}
declare global {
  type BlockNoteEditor = import("@blocknote/core").BlockNoteEditor<CustomBlockSchema>
  type Block = import("@blocknote/core").Block<CustomBlockSchema>
  type BlockWithOrder =  Block & { prevBlockId?: string | null, nextBlockId?: string | null }
  
  interface HttpRequestDataHead {

  }
  interface HttpRequestData<T = any> {
    head: HttpRequestDataHead,
    body:T
  }

  type ReturnTypePromiseFunc<T> = T extends (...args: any) => Promise<infer V> ? V : T;

  interface IdObj {
    id: string
  }

}

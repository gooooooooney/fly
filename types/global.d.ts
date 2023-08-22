import { CustomBlockSchema } from "@/components/editor/block-schema";

declare global {
  type BlockNoteEditor = import("@blocknote/core").BlockNoteEditor<CustomBlockSchema>
  type Block = import("@blocknote/core").Block<CustomBlockSchema>
  type BlockWithOrder =  Block & { prevBlockId: string | null, nextBlockId: string | null }

  interface HttpRequestDataHead {

  }
  interface HttpRequestData<T = any> {
    head:RequestDataHead,
    body:T
  }

  type ReturnTypePromiseFunc<T> = T extends (...args: any) => Promise<infer V> ? V : T;

}

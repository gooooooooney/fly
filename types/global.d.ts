import { CustomBlockSchema } from "@/components/editor/block-schema";

declare global {
  type BlockNoteEditor = import("@blocknote/core").BlockNoteEditor<CustomBlockSchema>

  interface HttpRequestDataHead {

  }
  interface HttpRequestData<T = any> {
    head:RequestDataHead,
    body:T
  }

  type ReturnTypePromiseFunc<T> = T extends (...args: any) => Promise<infer V> ? V : T;

}

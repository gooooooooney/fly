import { Mark } from "@tiptap/core";

export function registerCodeExtension(code: Mark) {
  code.options.HTMLAttributes.class = "text-code bg-[rgba(135,131,120,15%)] rounded-md px-1 py-0.5"
}


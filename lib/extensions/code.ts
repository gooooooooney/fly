import { Mark } from "@tiptap/core";

export function registerCodeExtension(code: Mark) {
  code.options.HTMLAttributes.class = "code rounded-md px-1 py-0.5"
}


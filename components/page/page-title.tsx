"use client"


import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";



export const PageTitle = () => {
  const [title, setTitle, editable, editor] = useStore(useBoundStore, (state) => [state.title, state.setTitle, state.editable, state.editor])
  const handleEnter = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      editor?.focus()
      e.preventDefault()
      
    }
  }
  return (
    <div className="my-4"
    >
      <h1
        defaultValue={title}
        onKeyDown={handleEnter}
        contentEditable={editable}
        onInput={(e) => {
          setTitle(e.currentTarget.textContent as string)
        }}
        placeholder="Untitled"
        className="[&[contenteditable]]:after:cursor-text [&[contenteditable]]:empty:after:content-[attr(placeholder)] [&[contenteditable]]:after:text-[#37352f26] dark:[&[contenteditable]]:after:text-[#373737] outline-none scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      />
<p onClick={() => console.log(editor?.topLevelBlocks)}>save</p>
    </div>
  )
}
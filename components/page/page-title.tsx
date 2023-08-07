"use client"


import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";
import ContentEditable from 'react-contenteditable'


export const PageTitle = () => {
  const [title, setTitle, editable, editor] = useStore(useBoundStore, (state) => [state.title, state.setTitle, state.editable, state.editor])
  const handleEnter = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    console.log(e.key)
    if (e.key === "Enter") {
      console.log("enter")
      editor?.focus()
      e.preventDefault()
      
    }
  }
  return (
    <div className="my-4">
      <ContentEditable
        html={title}
        onKeyDown={handleEnter}
        disabled={!editable}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled"
        className="[&[contenteditable]]:after:cursor-text [&[contenteditable]]:empty:after:content-[attr(placeholder)] [&[contenteditable]]:after:text-[#37352f26] dark:[&[contenteditable]]:after:text-[#373737] outline-none scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        tagName="h1"
      />

    </div>
  )
}
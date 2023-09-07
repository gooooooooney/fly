"use client";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { cn } from "@/lib/utils";
import { Link } from "@nextui-org/link";
import { FC, Fragment, HtmlHTMLAttributes, useState } from "react";
import { useStore } from "zustand";

export const TOC: FC<HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  const blocks = useStore(useBoundStore, (state) => state.blocks);
  const [activeItem, setActiveItem] = useState("");

  const headings = blocks.filter((block) => block.type == "heading")
  const handleItemClick = (id: string) => {
    setActiveItem(id);
    const target = document.querySelector(`[data-id="${id}"]`);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <ul className={cn(props.className, "flex flex-col w-40")}>
      {headings.map((heading) => {
        return (
          <Fragment key={heading.id}>
            <Link
              as="li"
              className="block cursor-pointer mt-2"
              underline="hover"
              color={activeItem === heading.id ? "success" : "primary"}
              onClick={() => handleItemClick(heading.id)}
            >
              {heading.content.map((ct, i) => {
                const s = () => {
                  switch (ct.type) {
                    case "text":
                      return ct.text;
                    case "link":
                      return ct.content.map((ct) => ct.text).join("");
                    default:
                      return "";
                  }
                };
                return (
                  <Fragment key={ct.type + i}>
                    <span
                      style={{
                        paddingLeft: `${((heading.props as any).level - 1) * 12}px`,
                      }}
                    >
                      {s()}
                    </span>
                  </Fragment>
                );
              })}
            </Link>
          </Fragment>
        );
      })}
    </ul>
  );
};

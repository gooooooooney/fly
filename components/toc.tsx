"use client";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { cn } from "@/lib/utils";
import { Link } from "@nextui-org/link";
import {
  FC,
  Fragment,
  HtmlHTMLAttributes,
  useState,
} from "react";

 const TOC: FC<HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  console.log("render toc")
  const blocks = useBoundStore(state => state.blocks)
  const collapsed = useBoundStore(state => state.collapsed)
  const [activeId, setActiveId] = useState("");

  const headings = blocks.filter((block) => block.type == "heading");
  const handleItemClick = (id: string) => {
    setActiveId(id);
    const target = document.querySelector(`[data-id="${id}"]`);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn(props.className, {
      "hidden": !collapsed
    })} >
      <ul className={cn("flex flex-col pl-10  max-w-[160px] w-fit")}>
        {headings.map((heading) => {
          return (
            <Fragment key={heading.id}>
              <li
              className="w-full"
              >
                {heading.content?.map((ct, i) => {
                  const text = (() => {
                    switch (ct.type) {
                      case "text":
                        return ct.text;
                      case "link":
                        return ct.content.map((ct) => ct.text).join("");
                      default:
                        return "";
                    }
                  })();

                  return (
                    <Fragment key={ct.type + i}>
                      <Link
                        as="span"
                        className={cn(
                          [
                            "inline-block cursor-pointer mt-2",
                            "transition-all transform -translate-x-1 duration-300 ease-in-out",
                            " hover:text-success-500 hover:translate-x-0",
                            "truncate w-full",
                          ],
                          {
                            "font-bold": activeId === heading.id,
                          }
                        )}
                        underline="hover"
                        color={activeId === heading.id ? "success" : "primary"}
                        onClick={() => handleItemClick(heading.id)}
                        // onClick={() => setActiveId(heading.id)}

                        title={text}
                        aria-label={text}
                        style={{
                          paddingLeft: `${
                            ((heading.props as any).level - 1) * 12
                          }px`,
                        }}
                      >
                        {text}
                      </Link>
                    </Fragment>
                  );
                })}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default TOC;

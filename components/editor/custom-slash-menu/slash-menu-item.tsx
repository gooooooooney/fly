import { DropdownItem } from "@nextui-org/dropdown";
import { useRef, useEffect } from "react";

export type SlashMenuItemProps = {
  name: string;
  icon: JSX.Element;
  hint: string | undefined;
  shortcut?: string;
  isSelected: boolean;
  set: () => void;
};

export const SlashMenuItem = (props: SlashMenuItemProps) => {
  const itemRef = useRef<HTMLButtonElement>(null);

  function isSelected() {
    const isKeyboardSelected = props.isSelected;
    // props.selectedIndex !== undefined && props.selectedIndex === props.index;
    const isMouseSelected = itemRef.current?.matches(":hover");

    return isKeyboardSelected || isMouseSelected;
  }

  // Updates HTML "data-hovered" attribute which Mantine uses to set mouse hover styles.
  // Allows users to "hover" menu items when navigating using the keyboard.
  function updateSelection() {
    isSelected()
      ? itemRef.current?.setAttribute("data-hovered", "true")
      : itemRef.current?.removeAttribute("data-hovered");
  }

  useEffect(() => {
    // Updates whether the item is selected with the keyboard (triggered on selectedIndex prop change).
    updateSelection();

    if (
      isSelected() &&
      itemRef.current &&
      itemRef.current.getBoundingClientRect().left > 5 //TODO: Kinda hacky, fix
      // This check is needed because initially the menu is initialized somewhere above outside the screen (with left = 1)
      // scrollIntoView() is called before the menu is set in the right place, and without the check would scroll to the top of the page every time
    ) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });
  return (
    <DropdownItem
      onClick={props.set}
      // Ensures an item selected with both mouse & keyboard doesn't get deselected on mouse leave.
      onMouseLeave={() => {
        setTimeout(() => {
          updateSelection();
        }, 1);
      }}
      key={props.name}
      startContent={props.icon}
      description={props.hint}
      shortcut={props.shortcut}
    >
      {props.name}
    </DropdownItem>
  );
};

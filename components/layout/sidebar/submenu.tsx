import { FC } from "react";
import {
  SubMenuProps,
  SubMenu as _SubMenu,
  menuClasses,
} from "react-pro-sidebar";

export const SubMenu: FC<SubMenuProps & React.RefAttributes<HTMLLIElement>> = (
  props
) => {
  const { children, rootStyles, ...rest } = props;
  return (
    <_SubMenu
      rootStyles={Object.assign(
        {
          [">." + menuClasses.subMenuContent]: {
            backgroundColor: "hsl(var(--background))",
          },
          [">." + menuClasses.button]: {
            borderRadius: "4px",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "hsl(var(--muted) / 0.9) !important",
            },
          },
        },
        rootStyles
      )}
      {...rest}
    >
      {children}
    </_SubMenu>
  );
};

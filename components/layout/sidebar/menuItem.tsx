
import { FC } from "react"
import { MenuItemProps, MenuItem as _MenuItem, menuClasses } from "react-pro-sidebar"

export const MenuItem: FC<MenuItemProps & React.RefAttributes<HTMLLIElement>> = (props) => {
  const { children, rootStyles, ...rest } = props
  return (
    <_MenuItem rootStyles={Object.assign({
      // text-sm font-medium leading-none
      fontSize: "14px",
      lineHeight: "1",
      ['>.' + menuClasses.button]: {
        borderRadius: '4px',
        transition: 'background-color 0.2s ease',
        "&:hover": {
          backgroundColor: "hsl(var(--muted) / 0.9) !important",
        }
      },
      ['.' + menuClasses.icon]: {
        marginRight: "0",
      }
    }, rootStyles)} {...rest}> {children} </_MenuItem>
  )
}
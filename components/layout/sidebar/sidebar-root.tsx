
import { FC } from "react"
import { SidebarProps, Sidebar as _Sidebar } from "react-pro-sidebar"

export const SidebarRoot: FC<SidebarProps & React.RefAttributes<HTMLHtmlElement>> = (props) => {
  const { children, rootStyles, ...rest } = props
  return (
    <_Sidebar
      backgroundColor='hsl(var(--background))'
      rootStyles={Object.assign({
        borderColor: 'hsl(var(--border))',
      }, rootStyles)}
      {...rest}> {children} </_Sidebar>
  )
}
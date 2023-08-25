"use client"
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Disclosure } from '@headlessui/react'


const navigation = [
  { name: 'Dashboard', href: '#', icon: Icons.CodeIcon, current: true },
  {
    name: 'Teams',
    icon: Icons.CodeIcon,
    current: false,
    children: [
      { name: 'Engineering', href: '#' },
      { name: 'Human Resources', href: '#' },
      { name: 'Customer Success', href: '#' },
    ],
  },
  {
    name: 'Projects',
    icon: Icons.CodeIcon,
    current: false,
    children: [
      { name: 'GraphQL API', href: '#' },
      { name: 'iOS App', href: '#' },
      { name: 'Android App', href: '#' },
      { name: 'New Customer Portal', href: '#' },
    ],
  },
  { name: 'Calendar', href: '#', icon: Icons.CodeIcon, current: false },
  { name: 'Documents', href: '#', icon: Icons.CodeIcon, current: false },
  { name: 'Reports', href: '#', icon: Icons.CodeIcon, current: false },
]


export default function Navigation() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6 w-80">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={cn(
                        item.current ? 'bg-muted' : 'hover:bg-muted',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-primary'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={cn(
                              item.current ? 'bg-muted' : 'hover:bg-muted',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-primary'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                            {item.name}
                            <Icons.ChevronRightIcon
                              className={cn(
                                open ? 'rotate-90 text-primary' : 'text-primary',
                                'ml-auto h-5 w-5 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  className={cn(
                                    subItem.current ? 'bg-muted' : 'hover:bg-muted',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-primary'
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-primary hover:bg-muted"
            >
              <img
                className="h-8 w-8 rounded-full bg-muted"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

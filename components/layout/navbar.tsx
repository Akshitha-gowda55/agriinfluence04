// components/layout/navbar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type NavItem = {
  name: string
  href: string
}

type NavbarProps = {
  navigation: NavItem[]
}

export default function Navbar({ navigation }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navigation.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href))

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              isActive
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-green-700'
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
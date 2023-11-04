"use client"

import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types/nav"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MainNavProps {
  items?: NavItem[]
}

export const MainNav = ({ items }: MainNavProps) => {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={"/"} className="flex items-center space-x-2">
        {/* //TODO fix logo */}
        <Icons.logo className="w-6 h-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 sm:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname === item.href && "text-foreground underline"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}

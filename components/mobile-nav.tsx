"use client"

import { useState } from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LucideMenu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavButtons from "@/components/nav-buttons"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"

import { NavItem } from "@/types/nav"

interface MobileNavProps {
  items?: NavItem[]
}
export const MobileNav = ({ items }: MobileNavProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <LucideMenu className="w-5 h-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="pr-0"
        onClick={() => setOpen(false)}
      >
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="w-4 h-4 mr-2" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex justify-start pt-4">
          <CustomConnectButton
            showBalance={false}
            chainStatus="icon"
            variant={"secondary"}
          />
        </div>
        <div className="flex flex-col justify-between h-full pb-14">
          <ScrollArea className="pb-10 pl-6 my-4">
            <div className="flex flex-col space-y-3">
              {items?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                      className={cn(
                        "text-muted-foreground",
                        pathname === item.href && "text-foreground underline"
                      )}
                    >
                      {item.title}
                    </MobileLink>
                  )
              )}
            </div>
          </ScrollArea>
          <NavButtons className="justify-end py-3 " />
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

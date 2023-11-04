import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"

interface NavButtonsProps {
  className?: string
}

const NavButtons: React.FC<NavButtonsProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center pr-6", className)}>
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <Icons.gitHub className="w-5 h-5" />
          <span className="sr-only">Github</span>
        </div>
      </Link>
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <Icons.twitter className="w-4 h-4 fill-current" />
          <span className="sr-only">Twitter</span>
        </div>
      </Link>
      {/* <ThemeSwitcher /> */}
      <ThemeToggle />
    </div>
  )
}
export default NavButtons

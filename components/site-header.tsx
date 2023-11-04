import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import NavButtons from "@/components/nav-buttons"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            {/* Desktop */}
            <div className="hidden space-x-3 sm:flex">
              <CustomConnectButton
                showBalance={false}
                chainStatus="icon"
                variant={"secondary"}
              />
              <NavButtons />
            </div>
            {/* Mobile */}
            <div className="flex sm:hidden">
              <MobileNav items={siteConfig.mainNav} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

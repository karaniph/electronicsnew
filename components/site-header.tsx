import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              ElectronicsParts
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/category/resistor"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Resistors
            </Link>
            <Link
              href="/category/capacitor"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Capacitors
            </Link>
            <Link
              href="/transistors"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Transistors
            </Link>
            <Link
              href="/circuits"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Circuits
            </Link>
            <Link
              href="/category/diode"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Diodes
            </Link>
            <Link
              href="/datasheets"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Datasheets
            </Link>
            <Link
              href="/equivalents"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Equivalents
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" asChild className="text-sm">
              <Link href="/search">
                <span className="hidden md:inline-flex">Search Components</span>
                <span className="inline-flex md:hidden">Search</span>
              </Link>
            </Button>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/component-selector">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span className="sr-only">Component Selector</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

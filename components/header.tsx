"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { uk } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    // Logout logic will be added in auth context
    localStorage.removeItem("sb-auth-token")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              02
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">{uk.header.title}</h1>
              <p className="text-xs text-muted-foreground">{uk.header.subtitle}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#president" className="text-foreground hover:text-primary transition">
              {uk.header.nav.president}
            </Link>
            <Link href="/#staff" className="text-foreground hover:text-primary transition">
              {uk.header.nav.staff}
            </Link>
            <Link href="/media" className="text-foreground hover:text-primary transition">
              {uk.header.nav.media}
            </Link>
            <Link href="/legislation" className="text-foreground hover:text-primary transition">
              {uk.header.nav.legislation}
            </Link>
            <Link href="/tenders" className="text-foreground hover:text-primary transition">
              {uk.header.nav.tenders}
            </Link>
            <Link href="/enterprises" className="text-foreground hover:text-primary transition">
              {uk.header.nav.enterprises}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/login">{uk.header.adminLogin}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/register">{uk.header.register}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserRole } from "@/lib/database"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { uk } from "@/lib/i18n"

async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const userRole = await getUserRole()
  if (!userRole || (userRole !== "admin" && userRole !== "manager")) {
    redirect("/")
  }

  const handleLogout = async () => {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{uk.header.title}</h1>
              <p className="text-sm text-muted-foreground">{uk.admin.dashboard}</p>
            </div>
          </div>
          <form action={handleLogout}>
            <Button variant="outline" type="submit">
              {uk.admin.logout}
            </Button>
          </form>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 border-r border-border bg-card p-6 min-h-[calc(100vh-80px)]">
          <div className="space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.admin.dashboard}
            </Link>
            <Link href="/admin/president" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.president}
            </Link>
            <Link href="/admin/staff" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.staff}
            </Link>
            <Link href="/admin/media" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.media}
            </Link>
            <Link href="/admin/legislation" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.legislation}
            </Link>
            <Link href="/admin/tenders" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.tenders}
            </Link>
            {/* Advocacy Management Section */}
            <Link href="/admin/advocacy" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.advocacy}
            </Link>
            <Link href="/admin/lectures" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.lectures}
            </Link>
            <Link href="/admin/enterprises" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
              {uk.management.enterprises}
            </Link>
            {userRole === "admin" && (
              <Link href="/admin/users" className="block px-4 py-2 rounded hover:bg-accent text-foreground">
                {uk.management.users}
              </Link>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout

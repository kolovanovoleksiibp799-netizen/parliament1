import Link from "next/link"
import { uk } from "@/lib/i18n"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">{uk.footer.administration}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#president" className="hover:text-foreground transition">
                  {uk.header.nav.president}
                </Link>
              </li>
              <li>
                <Link href="#staff" className="hover:text-foreground transition">
                  {uk.header.nav.staff}
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-foreground transition">
                  {uk.header.nav.media}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">{uk.footer.governance}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/legislation" className="hover:text-foreground transition">
                  {uk.header.nav.legislation}
                </Link>
              </li>
              <li>
                <Link href="/tenders" className="hover:text-foreground transition">
                  {uk.header.nav.tenders}
                </Link>
              </li>
              <li>
                <Link href="/enterprises" className="hover:text-foreground transition">
                  {uk.header.nav.enterprises}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">{uk.footer.contact}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contact@ua.gov" className="hover:text-foreground transition">
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+380441234567" className="hover:text-foreground transition">
                  {uk.footer.contact}
                </a>
              </li>
              <li>
                <span>Київ, Україна</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">{uk.footer.admin}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/auth/login" className="hover:text-foreground transition">
                  {uk.header.adminLogin}
                </Link>
              </li>
              <li>
                <span>{uk.admin.dashboard}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{uk.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

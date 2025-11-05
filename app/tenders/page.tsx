import { getAllTenders } from "@/lib/database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { uk } from "@/lib/i18n"
import Link from "next/link"

export default async function TendersPage() {
  const tenders = await getAllTenders()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-4">{uk.tenders.openTenders}</h1>
        <p className="text-muted-foreground mb-12">{uk.tenders.bidOpportunities}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {tenders.map((tender) => (
            <Card key={tender.id} className="hover:shadow-lg transition flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{tender.title}</CardTitle>
                <CardDescription>{tender.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground">{tender.description}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">{uk.tenders.budget}</p>
                    <p className="text-lg font-bold text-foreground">{tender.budget?.toLocaleString("uk-UA")} грн</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">{uk.tenders.deadline}</p>
                    <p className="text-sm text-foreground">{new Date(tender.deadline).toLocaleDateString("uk-UA")}</p>
                  </div>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href={`/tenders/${tender.id}`}>{uk.tenders.viewDetails}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

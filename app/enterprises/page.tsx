import { getAllEnterprises } from "@/lib/database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { uk } from "@/lib/i18n"

export default async function EnterprisesPage() {
  const enterprises = await getAllEnterprises()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-4">{uk.enterprises.title}</h1>
        <p className="text-muted-foreground mb-12">{uk.enterprises.description}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterprises.map((enterprise) => (
            <Card key={enterprise.id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg">{enterprise.company_name}</CardTitle>
                <CardDescription>{enterprise.company_type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {enterprise.description && <p className="text-muted-foreground">{enterprise.description}</p>}
                <div className="space-y-2 border-t border-border pt-3">
                  {enterprise.contact_person && (
                    <p>
                      <span className="font-semibold text-foreground">Контакт:</span> {enterprise.contact_person}
                    </p>
                  )}
                  {enterprise.discord && (
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Discord:</span> {enterprise.discord}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

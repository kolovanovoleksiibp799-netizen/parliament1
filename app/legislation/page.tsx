import { getAllLegislation } from "@/lib/database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { uk } from "@/lib/i18n"

export default async function LegislationPage() {
  const legislation = await getAllLegislation()

  const statusColors: Record<string, string> = {
    passed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    proposed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  const statusText: Record<string, string> = {
    passed: "Прийнято",
    proposed: "Запропоновано",
    rejected: "Відхилено",
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-4">{uk.pages.legislation}</h1>
        <p className="text-muted-foreground mb-12">Закони та нормативні акти, прийняті адміністрацією президента</p>

        <div className="space-y-6">
          {legislation.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap ${statusColors[item.status] || "bg-gray-100"}`}
                  >
                    {statusText[item.status] || item.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.content && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Деталі</h4>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                  </div>
                )}
                {item.date_proposed && (
                  <p className="text-xs text-muted-foreground">
                    Запропоновано: {new Date(item.date_proposed).toLocaleDateString("uk-UA")}
                  </p>
                )}
                {item.date_passed && (
                  <p className="text-xs text-muted-foreground">
                    Прийнято: {new Date(item.date_passed).toLocaleDateString("uk-UA")}
                  </p>
                )}
                <div className="pt-4 flex gap-2">
                  {item.original_url && (
                    <Button asChild variant="default" size="sm">
                      <a href={item.original_url} target="_blank" rel="noopener noreferrer">
                        Детальніше
                      </a>
                    </Button>
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

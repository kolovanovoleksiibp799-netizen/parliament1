import { getPresident } from "@/lib/database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { uk } from "@/lib/i18n"

export default async function PresidentPage() {
  const president = await getPresident()

  if (!president) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-muted-foreground">Інформація про президента недоступна</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">{uk.president.title}</h1>
          <p className="text-muted-foreground">Познайомтеся з лідером Західної України</p>
        </div>

        <Card className="border-0 shadow-lg mb-12">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {president.image_url && (
                <div className="flex items-center justify-center">
                  <Image
                    src={president.image_url || "/placeholder.svg"}
                    alt={president.name}
                    width={300}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{president.name}</h2>
                  <p className="text-lg text-primary font-medium">Президент регіону Західна Україна</p>
                </div>

                {president.bio && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Біографія</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{president.bio}</p>
                  </div>
                )}

                <div className="border-t border-border pt-6 space-y-3">
                  {president.telegram && (
                    <div>
                      <p className="text-sm font-semibold text-foreground">Telegram</p>
                      <a
                        href={`https://t.me/${president.telegram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {president.telegram}
                      </a>
                    </div>
                  )}
                  {president.discord && (
                    <div>
                      <p className="text-sm font-semibold text-foreground">Discord</p>
                      <p className="text-muted-foreground">{president.discord}</p>
                    </div>
                  )}
                  {president.official_start_date && (
                    <div>
                      <p className="text-sm font-semibold text-foreground">{uk.president.inOffice}</p>
                      <p className="text-muted-foreground">
                        {new Date(president.official_start_date).toLocaleDateString("uk-UA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

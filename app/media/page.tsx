import { getAllMedia } from "@/lib/database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { uk } from "@/lib/i18n"

export default async function MediaPage() {
  const media = await getAllMedia()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-4">{uk.media.title}</h1>
        <p className="text-muted-foreground mb-12">Прес-релізи, офіційні заяви та медіа-покриття</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition overflow-hidden">
              {item.image_url && (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image src={item.image_url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <CardHeader className="pb-3">
                <CardDescription className="text-xs uppercase tracking-wide">
                  {item.category || item.media_type}
                </CardDescription>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {item.date_published && (
                  <p className="text-xs text-muted-foreground mt-4">
                    {new Date(item.date_published).toLocaleDateString("uk-UA")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

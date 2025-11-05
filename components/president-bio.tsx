import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { uk } from "@/lib/i18n"

interface PresidentBioProps {
  president: {
    id: string
    name: string
    bio: string | null
    image_url: string | null
    email: string | null
    phone: string | null
    official_start_date: string | null
  }
}

export default function PresidentBio({ president }: PresidentBioProps) {
  return (
    <section id="president" className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">{uk.president.title}</h2>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="flex items-center justify-center">
                {president.image_url ? (
                  <Image
                    src={president.image_url || "/placeholder.svg"}
                    alt={president.name}
                    width={300}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-64 h-80 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">{uk.president.noImage}</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-foreground">{president.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{president.bio}</p>
                <div className="pt-4 border-t border-border space-y-2">
                  {president.email && (
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">{uk.president.email}</span>{" "}
                      <a href={`mailto:${president.email}`} className="text-primary hover:underline">
                        {president.email}
                      </a>
                    </p>
                  )}
                  {president.phone && (
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">{uk.president.phone}</span> {president.phone}
                    </p>
                  )}
                  {president.official_start_date && (
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">{uk.president.inOffice}</span>{" "}
                      {new Date(president.official_start_date).toLocaleDateString("uk-UA")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

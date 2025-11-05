import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface Media {
  id: string
  title: string
  description: string | null
  image_url: string | null
  media_type: string
  category: string | null
}

interface MediaSectionProps {
  media: Media[]
}

export default function MediaSection({ media }: MediaSectionProps) {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Latest Media</h2>
            <p className="text-muted-foreground">News, press releases, and official announcements</p>
          </div>
          <Link href="/media" className="text-primary hover:underline">
            View All →
          </Link>
        </div>
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
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

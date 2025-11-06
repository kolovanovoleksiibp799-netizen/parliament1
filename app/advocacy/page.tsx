import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllAdvocates, getAllLectures } from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { uk } from "@/lib/i18n"

export default async function AdvocacyPage() {
  const advocates = await getAllAdvocates()
  const lectures = await getAllLectures()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{uk.advocacy.title}</h1>
          <p className="text-lg text-muted-foreground">{uk.advocacy.description}</p>
        </div>

        {/* Advocates Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">{uk.advocacy.advocates}</h2>
          {advocates && advocates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advocates.map((advocate: any) => (
                <Card key={advocate.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{advocate.full_name}</CardTitle>
                    <CardDescription>Ліцензія: {advocate.license_number}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      <strong>Telegram:</strong>{" "}
                      <a
                        href={`https://t.me/${advocate.telegram.replace("@", "")}`}
                        className="text-blue-500 hover:underline"
                      >
                        {advocate.telegram}
                      </a>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{uk.advocacy.noAdvocates}</p>
          )}
        </div>

        {/* Lectures Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">{uk.advocacy.lectures}</h2>
          {lectures && lectures.length > 0 ? (
            <div className="space-y-4">
              {lectures.map((lecture: any) => (
                <Card key={lecture.id}>
                  <CardHeader>
                    <CardTitle>{lecture.topic}</CardTitle>
                    <CardDescription>
                      {lecture.lecturer} • {new Date(lecture.created_at).toLocaleDateString("uk-UA")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{lecture.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{uk.advocacy.noLectures}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

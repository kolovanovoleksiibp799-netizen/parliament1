import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { uk } from "@/lib/i18n"

interface StaffMember {
  id: string
  name: string
  position: string
  discord: string | null
  department: string | null
  image_url: string | null
  bio: string | null
}

interface StaffSectionProps {
  staff: StaffMember[]
}

export default function StaffSection({ staff }: StaffSectionProps) {
  return (
    <section id="staff" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">{uk.staff.title}</h2>
        <p className="text-muted-foreground text-center mb-12 text-balance">
          Познайомтеся з відданою командою, яка служить адміністрації президента
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition">
              <CardHeader className="pb-3">
                {member.image_url && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <Image
                      src={member.image_url || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">{member.position}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {member.department && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">{uk.staff.department}</span> {member.department}
                  </p>
                )}
                {member.bio && <p className="text-muted-foreground">{member.bio}</p>}
                {member.discord && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">{uk.management.discord}:</span> {member.discord}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

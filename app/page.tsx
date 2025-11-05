import { getPresident, getAllStaff, getAllMedia } from "@/lib/database"
import Header from "@/components/header"
import Hero from "@/components/hero"
import PresidentBio from "@/components/president-bio"
import StaffSection from "@/components/staff-section"
import MediaSection from "@/components/media-section"
import Footer from "@/components/footer"

export default async function Home() {
  const president = await getPresident()
  const staff = await getAllStaff()
  const media = await getAllMedia(6)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      {president && <PresidentBio president={president} />}
      {staff.length > 0 && <StaffSection staff={staff} />}
      {media.length > 0 && <MediaSection media={media} />}
      <Footer />
    </div>
  )
}

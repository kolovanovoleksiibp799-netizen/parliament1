import { uk } from "@/lib/i18n"

export default function Hero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">{uk.hero.title}</h2>
        <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">{uk.hero.subtitle}</p>
        {/* Buttons removed as they were non-working */}
      </div>
    </section>
  )
}

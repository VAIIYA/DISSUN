import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { AboutSection } from '@/components/AboutSection'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
    </main>
  )
}
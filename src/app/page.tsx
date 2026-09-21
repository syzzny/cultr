import { HeroSection } from '@/components/sections/Hero/HeroSection';
import { TwoCurationsSection } from '@/components/sections/TwoCurations/TwoCurationsSection';
import { TestimonialsSection } from '@/components/sections/Testimonials/TestimonialsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TwoCurationsSection />
      <TestimonialsSection />
    </main>
  );
}
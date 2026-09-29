import { HeroSection } from '@/components/sections/Hero/HeroSection';
import { TwoCurationsSection } from '@/components/sections/TwoCurations/TwoCurationsSection';
import { ThisWeekCULTRSection } from '@/components/sections/ThisWeekCULTR/ThisWeekCULTRSection';
import { SubscriberStatsSection } from '@/components/sections/SubscriberStats/SubscriberStatsSection';
import { CapabilitiesSection } from '@/components/sections/Capabilities/CapabilitiesSection';
import { TestimonialsSection } from '@/components/sections/Testimonials/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQ/FAQSection';
import { BottomCTASection } from '@/components/sections/BottomCTA/BottomCTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CapabilitiesSection />
      <TwoCurationsSection />
      <ThisWeekCULTRSection />
      <SubscriberStatsSection />
      <TestimonialsSection />
      <FAQSection/>
      <BottomCTASection />
    </main>
  );
}
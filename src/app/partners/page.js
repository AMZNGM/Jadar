import PartnersBgVid from '@/components/ui/PartnersBgVid.jsx'
import PartnersHero from '@/components/PartnersHero.jsx'
import EgyptJourneyIntro from '@/components/EgyptJourneyIntro.jsx'
import HorizontalCards from '@/components/HorizontalCards.jsx'

export default function Partners() {
  return (
    <main className="relative z-10 bg-bg">
      <div className="absolute inset-0">
        <PartnersBgVid />
      </div>
      <PartnersHero />
      <EgyptJourneyIntro />
      <HorizontalCards />
    </main>
  )
}

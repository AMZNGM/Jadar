import { BgNoise } from '@/data/mediaData/svgs.jsx'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import Hero from '@/components/hero-components/Hero.jsx'
import WhoWeAre from '@/components/WhoWeAre.jsx'
import BentoCards from '@/components/BentoCards.jsx'
// import Map from '@/components/Map.jsx'
import PartnersBgVid from '@/components/ui/PartnersBgVid'
import EgyptJourneyIntro from '@/components/EgyptJourneyIntro'
import OurJourney from '@/components/OurJourney'
// import ProjectsGallery from '@/components/ProjectsGallery.jsx'

export default function Home() {
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[12]

  return (
    <main className="relative">
      <div className="sticky top-0 z-10 bg-bg">
        <BgNoise />
        <Hero bgVidSrc={bgVid} mobileImgsrc={mobileImgsrc} videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE" />
      </div>
      <div className="h-150" />

      <div className="relative z-20 bg-black">
        {/* <WhoWeAre /> */}
        <div className="-translate- y-20">
          {/* <BentoCards /> */}
          {/* <Map /> */}
        </div>
      </div>

      <div className="relative z-40">
        {/* <div className="absolute inset-0">
          <PartnersBgVid />
        </div> */}
        {/* <EgyptJourneyIntro /> */}
        {/* <OurJourney /> */}
        {/* <ProjectsGallery /> */}
      </div>
    </main>
  )
}

import Image from 'next/image'
import { useTranslation } from '@/translations/useTranslation'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'

export default function OurLegacy() {
  const { t } = useTranslation()

  const OurLegacyProjects = [
    {
      id: 1,
      name: t(`ourLegacyProjects1Name`),
      li1: t(`ourLegacyProjects1Line1`),
      li2: t(`ourLegacyProjects1Line2`),
      li3: t(`ourLegacyProjects1Line3`),
      li4: t(`ourLegacyProjects1Line4`),
      img: ArtboardImgs[11],
    },
    {
      id: 2,
      name: t(`ourLegacyProjects2Name`),
      li1: t(`ourLegacyProjects2Line1`),
      li2: t(`ourLegacyProjects2Line2`),
      li3: t(`ourLegacyProjects2Line3`),
      li4: t(`ourLegacyProjects2Line4`),
      img: ArtboardImgs[10],
    },
  ]

  return (
    <section className="relative w-screen overflow-hidden bg-bg py-6 px-4">
      <BgNoise />

      {OurLegacyProjects.map((project) => {
        return (
          <div
            key={project.id}
            className="grid overflow-hidden grid-cols-5 gap-16 py-8 w-full border-t max-md:grid-cols-1 max-md:gap-8 border-main/50"
          >
            <div className="md:col-span-3">
              <div className="flex flex-col justify-start h-full">
                <SplitedText
                  text={project.name}
                  delay={20}
                  className="mb-8 text-4xl font-light max-md:text-3xl text-main/75 max-md:mb-6"
                  as="h2"
                />

                <ol className="space-y-4 text-xl font-light leading-relaxed max-md:text-base md:space-y-6">
                  <li className="flex items-start">
                    <SplitedText text={`• ${project.li1}`} delay={10} tag="span" from={{ opacity: 0, y: 0 }} />
                  </li>
                  <li className="flex items-start">
                    <SplitedText text={`• ${project.li2}`} delay={10} tag="span" from={{ opacity: 0, y: 0 }} />
                  </li>
                  <li className="flex items-start">
                    <SplitedText text={`• ${project.li3}`} delay={10} tag="span" from={{ opacity: 0, y: 0 }} />
                  </li>
                  <li className="flex items-start">
                    <SplitedText text={`• ${project.li4}`} delay={10} tag="span" from={{ opacity: 0, y: 0 }} />
                  </li>
                </ol>
              </div>
            </div>

            <div className="relative size-full md:col-span-2">
              <div className="relative size-full overflow-hidden">
                <ParallaxElement direction="scale">
                  <Image
                    src={project.img}
                    alt={`Visual representation of ${project.name}`}
                    className="object-cover size-full lg:h-96"
                    loading="eager"
                  />
                  <MovingBorders />
                </ParallaxElement>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

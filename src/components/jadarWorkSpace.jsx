'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import Noise from '@/components/ui/effects/Noise.jsx'

export default function JadarWorkSpace() {
  const { t } = useTranslation()
  const svgRef = useRef(null)
  const polylineRef = useRef(null)

  useGSAP(() => {
    const svg = svgRef.current
    const polyline = polylineRef.current

    if (!svg || !polyline) return

    gsap.set(polyline, {
      strokeDasharray: '15 18',
      strokeDashoffset: 1000,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        end: 'top -100%',
        scrub: 1.5,
        toggleActions: 'play reverse play reverse',
      },
    })

    tl.to(polyline, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
    })

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section className="relative w-screen overflow-hidden bg-text">
      <div className="relative w-full h-1/2 py-24 px-4 bg-bg text-text">
        <Noise className={'opacity-75'} />
        <BgNoise />

        <svg ref={svgRef} className="absolute top-0 max-md:top-40 left-0 w-100 h-300" viewBox="0 0 800 400">
          <path
            ref={polylineRef}
            fill="none"
            strokeWidth="5"
            stroke="hsl(12, 84%, 46%)"
            strokeLinecap="round"
            strokeDasharray="0 0"
            d="M121.97309112548828,39.461883544921875C124.43647085825602,93.04036097208659,153.56652264595033,297.991041615804,136.3228759765625,351.56951904296875C119.07922930717469,405.1479964701335,41.23169032732646,374.355770111084,21.5246639251709,351.56951904296875C1.817637523015339,328.7832679748535,3.0493280442555744,243.4678601582845,21.5246639251709,218.83407592773438C39.99999980608622,194.20029169718424,101.43497542381286,185.28549575805664,129.14797973632812,208.07174682617188C156.8609840488434,230.8579978942871,172.49028155008952,351.56951904296875,182.9596405029297,351.56951904296875C193.42899945576985,351.56951904296875,182.74440147399903,262.8819134648641,190.13453674316406,208.07174682617188C197.5246720123291,153.26158018747964,212.46039477030436,32.90284019470215,226.00897216796875,32.28699493408203C239.55754956563314,31.671149673461915,274.6008906809489,173.69207103729246,269.05828857421875,204.4842987060547C263.5156864674886,235.2765263748169,194.9536548868815,210.42750442504882,193.7219696044922,211.65919494628906C192.49028432210287,212.8908854675293,248.3348402150472,188.25710385640463,261.8834228515625,211.65919494628906C275.4320054880778,235.0612860361735,265.87146194458006,325.8116498565674,272.645751953125,347.9820556640625C279.42004196166994,370.1524614715576,298.8819305928548,398.0807314014435,301.3453063964844,340.80718994140625C303.80868220011394,283.533648481369,273.4469338989258,38.98355954488119,286.9955139160156,14.349775314331055C300.54409393310544,-10.284008916219076,378.4215403238932,140.6517189057668,380.2690734863281,197.30941772460938C382.116606648763,253.96711654345194,287.90433456420897,319.1449959309896,297.7578430175781,344.3946228027344C307.6113514709473,369.64424967447917,411.8026823425293,369.64424967447917,437.66815185546875,344.3946228027344C463.5336213684082,319.1449959309896,441.04034306844073,252.73542733192443,448.43048095703125,197.30941772460938C455.82061884562177,141.88340811729432,469.01645192464196,23.372197087605795,480.7174987792969,21.5246639251709C492.4185456339518,19.677130762736002,520.9028331502278,156.37070588747662,516.5919189453125,186.54708862304688C512.2810047403972,216.72347135861713,456.83706247965495,196.0777298227946,455.6053771972656,197.30941772460938C454.3736919148763,198.54110562642416,497.1001637268066,169.70403325398763,509.41705322265625,193.7219696044922C521.7339427185059,217.73990595499674,516.8848969523112,313.20178759257,527.354248046875,337.2197265625C537.8235991414388,361.23766553243,564.8609649658204,359.49776321411133,570.403564453125,333.6322937011719C575.9461639404296,307.7668241882324,562.7204537963867,240.12556506792703,559.6412353515625,186.54708862304688C556.5620169067383,132.96861217816672,527.8325801595053,43.69506842295329,552.4663696289062,21.5246639251709C577.1001590983072,-0.6457405726114942,685.2795438639323,37.076232213973995,703.1390380859375,57.39910125732422C720.9985323079427,77.72197030067444,680.5201998901367,118.35574960072836,656.5022583007812,139.91030883789062C632.4843167114258,161.4648680750529,568.1554608154297,174.95365997314454,563.2286987304688,182.9596405029297C558.3019366455078,190.96562103271484,605.0164275105794,160.68161649068196,627.8026733398438,186.54708862304688C650.5889191691081,212.4125607554118,684.2630644734701,308.3826668294271,695.964111328125,333.6322937011719"
            transform="matrix(0.6758559386612666,-0.04103837558765469,0.03385144648003241,0.8794149082281165,151.81168710897583,41.88518766664859)"
          />
        </svg>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 size-full">
          <div className="space-y-6 md:p-4 font-light flex flex-col justify-center">
            <SplitedText
              text={t('jadarWorkSpace')}
              tag="h2"
              delay={50}
              from={{ opacity: 0, x: 40 }}
              to={{ opacity: 1, x: 0 }}
              className="text-3xl uppercase"
            />

            <SplitedText
              text={t('jadarWorkSpaceDesc1')}
              tag="p"
              delay={5}
              from={{ opacity: 0, x: 40 }}
              to={{ opacity: 1, x: 0 }}
              className="text-sm text-text/75"
            />

            <SplitedText
              text={t('jadarWorkSpaceDesc2')}
              tag="p"
              delay={5}
              from={{ opacity: 0, x: 40 }}
              to={{ opacity: 1, x: 0 }}
              className="text-sm text-text/75"
            />
          </div>

          <Image src={ArtboardImgs[19]} alt="Jadar workspace environment" loading="lazy" className="size-full object-cover" />
        </div>
      </div>

      <div className="relative w-full h-1/2 py-24 px-4 bg-bg/50 text-bg">
        <Noise className={'opacity-50'} />

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 size-full">
          <Image src={ArtboardImgs[18]} alt="Jadar workspace environment" loading="lazy" className="size-full object-cover" />

          <div className="space-y-6 md:p-4 font-light flex flex-col justify-center">
            <SplitedText
              text={t('workWithUs')}
              tag="h2"
              delay={50}
              from={{ opacity: 0, x: 40 }}
              to={{ opacity: 1, x: 0 }}
              className="text-3xl uppercase"
            />

            <SplitedText
              text={t('workWithUsDesc')}
              tag="p"
              delay={5}
              from={{ opacity: 0, x: 40 }}
              to={{ opacity: 1, x: 0 }}
              className="font-medium text-bg/75"
            />

            <div className="flex">
              <MainBtn text={t(`opportunities`)} to={'/careerCenter'} className="bg-bg! hover:bg-main!" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

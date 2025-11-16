'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise, FadeBorders, MovingBorders } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import { getCountriesData } from '@/data/countriesData'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const Map = () => {
  const { t } = useTranslation()
  const countries = getCountriesData(t)
  const sectionRef = useRef(null)
  const autoplayRef = useRef(null)
  const [mapData, setMapData] = useState(countries)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedOverride, setSelectedOverride] = useState(null)
  const selectedCountry = selectedOverride || mapData[selectedIndex] || null

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % mapData.length)
      setSelectedOverride(null)
    }, 5000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const resetAutoplay = () => {
    stopAutoplay()
    startAutoplay()
  }

  const handleCountryClick = (countryData) => {
    const idx = mapData.findIndex((c) => c.countryCode === countryData.countryCode)
    if (idx !== -1) {
      setSelectedIndex(idx)
      setSelectedOverride(null)
      resetAutoplay()
    } else {
      const ephemeral = {
        countryName: countryData.countryName || countryData.name || 'Unknown',
        country: countryData.country || '',
        countryCode: countryData.countryCode,
        value: 0,
        img: null,
        isEphemeral: true,
      }
      setSelectedOverride(ephemeral)
      resetAutoplay()
    }
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % mapData.length)
    setSelectedOverride(null)
    resetAutoplay()
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + mapData.length) % mapData.length)
    setSelectedOverride(null)
    resetAutoplay()
  }

  useGSAP(() => {
    if (selectedCountry) {
      gsap.fromTo(
        '.country-info',
        { rotateX: gsap.utils.random(-360, 360), rotateY: gsap.utils.random(-360, 360), opacity: 0 },
        { rotateX: 0, rotateY: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [sectionRef, selectedCountry?.countryCode])

  return (
    <section ref={sectionRef} id="map-section" className="relative w-screen md:h-screen overflow-hidden bg-black text-main py-8 px-4">
      <FadeBorders />
      <BgNoise />

      <ParallaxElement disableSm speed={-0.03}>
        <FloatingEffect>
          <Image
            src={ArtboardImgs[16]}
            loading="lazy"
            alt="Background Image"
            className="size-full object-cover absolute inset-0 opacity-50 -translate-y-20 translate-x-10 pointer-events-none -z-10 max-md:hidden"
          />

          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150, center: [0, 0] }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isoA3 = geo.properties.ISO_A3 || geo.properties.iso_a3 || geo.properties.ADM0_A3
                  const isoA2 = geo.properties.ISO_A2 || geo.properties.iso_a2 || ''
                  const isoA2Lower = isoA2 ? String(isoA2).toLowerCase() : ''
                  const nameProp = geo.properties.NAME || geo.properties.name || geo.properties.ADMIN || geo.properties.NAME_LONG

                  const isHighlighted = mapData.some(
                    (country) =>
                      country.countryCode === isoA3 ||
                      (isoA2Lower && country.country === isoA2Lower) ||
                      (nameProp && country.countryName === nameProp)
                  )

                  const isSelected =
                    !!selectedCountry &&
                    ((selectedCountry.countryCode && selectedCountry.countryCode === isoA3) ||
                      (isoA2Lower && selectedCountry.country && selectedCountry.country === isoA2Lower) ||
                      (nameProp && selectedCountry.countryName === nameProp))

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        const countryName =
                          geo.properties.name ||
                          geo.properties.NAME ||
                          geo.properties.NAME_LONG ||
                          geo.properties.ADMIN ||
                          geo.properties.FORMAL_EN ||
                          geo.properties.NAME_EN ||
                          geo.properties.SOVEREIGNT ||
                          isoA3 ||
                          'Unknown'
                        const country = isoA2 ? isoA2.toLowerCase() : ''

                        const countryData =
                          mapData.find((c) => c.countryCode === isoA3) || mapData.find((c) => c.countryName === countryName)

                        if (countryData) {
                          handleCountryClick(countryData)
                        } else {
                          handleCountryClick({
                            countryCode: isoA3,
                            countryName,
                            country,
                            name: countryName,
                          })
                        }
                      }}
                      style={{
                        default: {
                          fill: isSelected ? '#d73b13' : isHighlighted ? '#FFC107' : 'gray',
                          stroke: isSelected ? '#d73b13' : isHighlighted ? '#FFC107' : 'var(--color-bg)',
                          strokeWidth: isSelected ? 3 : isHighlighted ? 1.5 : 1,
                          strokeOpacity: isSelected ? 1 : isHighlighted ? 1 : 0.2,
                          outline: 'none',
                        },
                        hover: {
                          fill: isSelected ? '#d73b13' : '#FFC107',
                          stroke: isSelected ? '#d73b13' : '#FFC107',
                          strokeWidth: isSelected ? 3 : 2,
                          strokeOpacity: 1,
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: isSelected ? '#d73b13' : isHighlighted ? '#FFC107' : 'gray',
                          stroke: '#d73b13',
                          strokeWidth: 3,
                          strokeOpacity: 1,
                          outline: 'none',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {mapData.map((item) => {
              const isActive = selectedCountry && selectedCountry.countryCode === item.countryCode
              return (
                <Marker key={`marker-${item.countryCode}`} coordinates={item.coordinates} onClick={() => handleCountryClick(item)}>
                  <g
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCountryClick(item)
                    }}
                    className="outline-none select-none cursor-pointer"
                  >
                    <circle r={5} fill={isActive ? '#d73b13' : '#FFC107'} stroke="#181818" strokeWidth={1} />
                  </g>
                </Marker>
              )
            })}
          </ComposableMap>
        </FloatingEffect>
      </ParallaxElement>

      <ParallaxElement
        disableSm
        key={selectedCountry.countryCode}
        className="md:absolute bottom-24 left-14 w-100 max-md:w-full text-4xl text-center font-light z-20 space-y-2 mt-8"
      >
        <h3 className="country-info transform-3d bg-bg/85 border border-text/20 backdrop-blur-2xl overflow-hidden p-4">
          <MovingBorders />
          {selectedCountry.isEphemeral ? t('weAreNotIn') : t('weAreIn')}
        </h3>

        <div className="country-info transform-3d bg-bg/85 border border-text/20 backdrop-blur-2xl overflow-hidden flex flex-col justify-between items-start size-full gap-4 p-6">
          <MovingBorders />

          <h3>{selectedCountry.countryName}</h3>

          <div className="flex justify-between items-center size-full">
            <div className="flex items-center gap-2 size-full">
              <p className="text-base text-text/75">{t('projectsCount')}</p>

              <span className="text-base bg-text/10 px-2 py-1">{selectedCountry.isEphemeral ? '0' : `${selectedCountry.value}`}</span>
            </div>

            <div className="flex justify-between items-center gap-2">
              <MainBtn
                text="<"
                onClick={handlePrev}
                aria-label="Previous country"
                look="ghost"
                size="sm"
                className="bg-text/10 text-xl! px-2! py-0!"
              />

              <h4 className="text-xl font-extralight uppercase lg:text-2xl text-main">{selectedCountry.country}</h4>

              <MainBtn
                text=">"
                onClick={handleNext}
                aria-label="Next country"
                look="ghost"
                size="sm"
                className="bg-text/10 text-xl! px-2! py-0!"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 w-full h-35">
          <div className="country-info transform-3d bg-bg/85 border border-text/20 backdrop-blur-2xl overflow-hidden flex justify-center items-center size-full p-2">
            <MovingBorders />

            {selectedCountry.img ? (
              <Image src={selectedCountry.img} alt={selectedCountry.countryName} loading="lazy" className="size-full object-cover" />
            ) : (
              <span className="text-base text-text/75">{t(`noImageAvailable`)}</span>
            )}
          </div>

          <div className="country-info transform-3d bg-bg/85 border border-text/20 backdrop-blur-2xl overflow-hidden flex justify-center items-center size-full p-2">
            <MovingBorders />

            <p className="text-base text-text/75">
              {t(`currentlyWorkingOn`)} <span className="text-main">{selectedCountry.isEphemeral ? 0 : selectedCountry.value}</span>{' '}
              {t(`projectsIn`)} <span className="text-main">{selectedCountry.countryName}</span>
            </p>
          </div>
        </div>
      </ParallaxElement>
    </section>
  )
}

export default Map

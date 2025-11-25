'use client'

import Image from 'next/image'
import Map, { Marker } from 'react-map-gl/maplibre'
import { useRef, useState, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { FadeBorders, MovingBorders } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { getCountriesData } from '@/data/countriesData'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapSection() {
  const mapStyle = '/map-styles/neom-dark.json'
  const { t } = useTranslation()
  const countries = getCountriesData(t)
  const sectionRef = useRef(null)
  const autoplayRef = useRef(null)
  const mapRef = useRef(null)
  const [mapData, setMapData] = useState(countries)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 1,
  })
  const selectedCountry = mapData[selectedIndex] || null

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)

    autoplayRef.current = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % mapData.length
      const nextCountry = mapData[nextIndex]

      setSelectedIndex(nextIndex)

      if (nextCountry.coordinates && mapRef.current) {
        mapRef.current.flyTo({
          center: nextCountry.coordinates,
          zoom: 4,
          duration: 1500,
        })
      }

      resetAutoplay()
    }, 4000)
  }

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const handleCountryClick = (countryData) => {
    const idx = mapData.findIndex((c) => c.countryCode === countryData.countryCode)
    if (idx !== -1) {
      setSelectedIndex(idx)

      resetAutoplay()

      if (countryData.coordinates && mapRef.current) {
        mapRef.current.flyTo({
          center: countryData.coordinates,
          zoom: 4,
          duration: 1500,
        })
      }
    }
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % mapData.length)

    const nextCountry = mapData[(selectedIndex + 1) % mapData.length]
    if (nextCountry.coordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: nextCountry.coordinates,
        zoom: 4,
        duration: 1500,
      })
    }
    resetAutoplay()
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + mapData.length) % mapData.length)

    const prevCountry = mapData[(selectedIndex - 1 + mapData.length) % mapData.length]
    if (prevCountry.coordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: prevCountry.coordinates,
        zoom: 4,
        duration: 1500,
      })
    }
    resetAutoplay()
  }

  useGSAP(() => {
    // if (window.innerWidth < 678) return null

    if (selectedCountry) {
      gsap.fromTo(
        '.country-info',
        { rotateX: gsap.utils.random(-360, 360), rotateY: gsap.utils.random(-360, 360), opacity: 0 },
        { rotateX: 0, rotateY: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [sectionRef, selectedCountry?.countryCode])

  useEffect(() => {
    startAutoplay()
  })

  return (
    <section ref={sectionRef} id="map-section" className="relative w-screen h-screen overflow-hidden bg-black text-main uppercase">
      <FadeBorders className="opacity-50" />

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        attributionControl={false}
        scrollZoom={false}
        dragRotate={true}
        dragPan={true}
        doubleClickZoom={true}
        touchZoomRotate={false}
        touchPitch={false}
        touchAction="none"
        boxZoom={false}
        keyboard={false}
      >
        {mapData.map((country) => {
          if (!country.coordinates) return null
          const isSelected = selectedCountry && selectedCountry.countryCode === country.countryCode
          return (
            <Marker
              key={`marker-${country.countryCode}`}
              longitude={country.coordinates[0]}
              latitude={country.coordinates[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                handleCountryClick(country, e)
              }}
            >
              <div className={`cursor-pointer transition-all duration-300 ${isSelected ? 'scale-150' : 'scale-100'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" fill={isSelected ? '#d73b13' : '#d73b1380'} stroke="#181818" strokeWidth="2" />
                  {isSelected && <circle cx="12" cy="12" r="4" fill="#181818" className="pulse-animation" />}
                </svg>
              </div>
            </Marker>
          )
        })}
      </Map>

      <ParallaxElement
        key={selectedCountry?.countryCode}
        className={`absolute md:bottom-24 md:left-14 bottom-4 left-0 w-100 max-md:w-full text-4xl text-center font-light z-20 space-y-2 mt-8 px-4`}
      >
        <h3 className="country-info transform-3d bg-bg/50 border border-text/20 backdrop-blur-sm overflow-hidden p-4">
          <MovingBorders />
          {selectedCountry?.isEphemeral ? t('weAreNotIn') : t('weAreIn')}
        </h3>

        <div className="country-info transform-3d bg-bg/50 border border-text/20 backdrop-blur-sm overflow-hidden flex flex-col justify-between items-start size-full gap-4 p-6">
          <MovingBorders />

          <h3>{selectedCountry?.countryName}</h3>

          <div className="flex justify-between items-center size-full">
            <div className="flex items-center gap-2 size-full">
              <p className="text-base text-text/75">{t('projectsCount')}</p>

              <span className="text-base bg-text/10 px-2 py-1">{selectedCountry?.isEphemeral ? '0' : `${selectedCountry?.value}`}</span>
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

              <h4 className="text-xl font-extralight uppercase lg:text-2xl text-main">{selectedCountry?.country}</h4>

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
          <div className="country-info transform-3d bg-bg/50 border border-text/20 backdrop-blur-sm overflow-hidden flex justify-center items-center size-full p-2">
            <MovingBorders />

            {selectedCountry?.img ? (
              <Image src={selectedCountry.img} alt={selectedCountry.countryName} loading="eager" className="size-full object-cover" />
            ) : (
              <span className="text-base text-text/75">{t(`noImageAvailable`)}</span>
            )}
          </div>

          <div className="country-info transform-3d bg-bg/50 border border-text/20 backdrop-blur-sm overflow-hidden flex justify-center items-center size-full p-2">
            <MovingBorders />

            <p className="text-base text-text/75">
              {t(`currentlyWorkingOn`)} <span className="text-main">{selectedCountry?.isEphemeral ? 0 : selectedCountry?.value}</span>{' '}
              {t(`projectsIn`)} <span className="text-main">{selectedCountry?.countryName}</span>
            </p>
          </div>
        </div>
      </ParallaxElement>
    </section>
  )
}

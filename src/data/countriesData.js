import { ArtboardImgs } from '@/data/mediaData/artBoardImgs.js'

export const getCountriesData = (t) => [
  {
    countryName: t('egypt'),
    country: 'eg',
    countryCode: 'EGY',
    value: 30,
    coordinates: [31.2357, 30.0444],
    img: ArtboardImgs[0],
  },
  {
    countryName: t('kuwait'),
    country: 'kw',
    countryCode: 'KWT',
    value: 45,
    coordinates: [47.9774, 29.3117],
    img: ArtboardImgs[17],
  },
  {
    countryName: t('unitedKingdom'),
    country: 'uk',
    countryCode: 'UK',
    value: 35,
    coordinates: [-3.436, 55.3781],
    img: ArtboardImgs[18],
  },
  {
    countryName: t('saudiArabia'),
    country: 'sa',
    countryCode: 'SAU',
    value: 40,
    coordinates: [45.0792, 23.8859],
    img: ArtboardImgs[15],
  },
]

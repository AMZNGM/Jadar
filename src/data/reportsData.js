import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'

export const reportsData = (t) => [
  {
    id: 1,
    date: '2021',
    image: ArtboardImgs[9],
    fileLink: '/files/Jadar-2021.pdf',
  },
  {
    id: 2,
    date: '2022',
    image: ArtboardImgs[10],
    fileLink: '/files/Jadar-2022.pdf',
  },
  {
    id: 3,
    date: '2023',
    image: ArtboardImgs[6],
    fileLink: '/files/Jadar-2023.pdf',
  },
  {
    id: 4,
    date: '2024',
    image: ArtboardImgs[7],
    fileLink: '/files/Jadar-2024.pdf',
  },
  {
    id: 5,
    date: t('2025'),
    image: ArtboardImgs[8],
    fileLink: '/files/Jadar-2025.pdf',
  },
]

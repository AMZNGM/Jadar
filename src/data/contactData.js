import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

export const getSocialLinks = (t) => [
  {
    name: t('instagram'),
    url: 'https://instagram.com/yourusername',
    icon: InstagramIcon,
    color: '#E4405F',
  },
  {
    name: t('linkedin'),
    url: 'https://linkedin.com/in/yourusername',
    icon: LinkedinIcon,
    color: '#0A66C2',
  },
  {
    name: t('twitter'),
    url: 'https://twitter.com/yourusername',
    icon: TwitterIcon,
    color: '#1DA1F2',
  },
  {
    name: t('youtube'),
    url: 'https://youtube.com/c/yourchannel',
    icon: YoutubeIcon,
    color: '#FF0000',
  },
  {
    name: t('facebook'),
    url: 'https://facebook.com/yourusername',
    icon: FacebookIcon,
    color: '#1877F2',
  },
]

export const contactInfo = {
  email: {
    address: 'contact@jadar.com',
    display: 'contact@jadar.com',
    mailto: 'mailto:contact@jadar.com?subject=Inquiry from Jadar Website',
  },
  phone: {
    number: '+201000000000',
    display: '+20 100 000 0000',
    tel: 'tel:+201000000000',
  },
  address: {
    line1: 'JADAR HQ, Innovation District',
    line2: 'Global City, Kuwait',
    googleMapsLink: 'https://maps.google.com',
  },
  workingHours: {
    weekdays: '9:00 AM - 6:00 PM',
    weekends: 'Closed',
  },
}

import { useMemo } from 'react'
import { useNavigationLinks } from '@/data/navigationLinks'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import articlesData from '@/data/articlesData'

const CONFIG = {
  wordsPerMinute: 200,
  defaultReadTime: '1 min',
}

const ROUTE_IMAGES = {
  '/about': ArtboardImgs[10],
  '/leadership': ArtboardImgs[10],
  '/socialResponsibility': ArtboardImgs[10],
  '/projects': ArtboardImgs[11],
  '/partners': ArtboardImgs[10],
  '/allNews': ArtboardImgs[0],
  '/mediaResources': ArtboardImgs[0],
  '/press': ArtboardImgs[0],
  '/investInJadar': ArtboardImgs[10],
  '/jadarInvestmentOffice': ArtboardImgs[10],
  '/workAtJadar': ArtboardImgs[10],
  '/careerCenter': ArtboardImgs[10],
}

const TYPE_IMAGES = {
  Article: ArtboardImgs[0],
  Project: ArtboardImgs[11],
  Navigation: ArtboardImgs[10],
  Legal: ArtboardImgs[10],
  Contact: ArtboardImgs[10],
  Page: ArtboardImgs[10],
}

const STATIC_PAGES = [
  {
    title: 'Home',
    desc: 'Jadar Group homepage - Discover our innovative projects and sustainable developments',
    to: '/',
    type: 'Page',
    image: ArtboardImgs[10],
  },
  {
    title: 'Privacy Policy',
    desc: 'Privacy policy and data protection information for Jadar Group',
    to: '/privacyPolicy',
    type: 'Legal',
    image: ArtboardImgs[10],
  },
  {
    title: 'Terms of Use',
    desc: 'Terms and conditions for website usage and services',
    to: '/termsOfUse',
    type: 'Legal',
    image: ArtboardImgs[10],
  },
  {
    title: 'Cookie Policy',
    desc: 'Cookie usage, preferences, and tracking information',
    to: '/cookiePolicy',
    type: 'Legal',
    image: ArtboardImgs[10],
  },
  {
    title: 'Get In Touch',
    desc: 'Contact information, inquiry form, and location details',
    to: '/getInTouch',
    type: 'Contact',
    image: ArtboardImgs[10],
  },
]

const PROJECT_PAGES = [
  {
    title: 'West Abdullah Al Mubarak City',
    desc: 'Sustainable urban development project with innovative community planning',
    to: '/westAbdullahAlMubarakCity',
    type: 'Project',
    image: ArtboardImgs[11],
  },
  {
    title: 'East Sabah Al Ahmad City',
    desc: 'Modern residential and commercial development with green spaces',
    to: '/eastSabahAlAhmadCity',
    type: 'Project',
    image: ArtboardImgs[11],
  },
  {
    title: 'Al Mutlaa City',
    desc: 'Integrated community development with sustainable infrastructure',
    to: '/alMutlaaCity',
    type: 'Project',
    image: ArtboardImgs[11],
  },
  {
    title: 'Levels Tower',
    desc: 'Iconic skyscraper featuring innovative architectural design',
    to: '/levelsTower',
    type: 'Project',
    image: ArtboardImgs[11],
  },
]

function calculateReadTime(content) {
  if (!content) return CONFIG.defaultReadTime

  const plainText = content.replace(/<[^>]*>/g, '')
  const words = plainText.split(/\s+/).filter((word) => word.length > 0).length

  const minutes = Math.max(1, Math.ceil(words / CONFIG.wordsPerMinute))
  return `${minutes} min read`
}

function getImageByRoute(route) {
  if (!route) return ArtboardImgs[10]
  return ROUTE_IMAGES[route] || ArtboardImgs[10]
}

function getImageByType(type) {
  return TYPE_IMAGES[type] || ArtboardImgs[10]
}

function validateSearchItem(item) {
  if (!item.title || !item.to) {
    console.warn('Invalid search item detected:', item)
    return false
  }

  // Validate URL format
  if (!item.to.startsWith('/') && !item.to.startsWith('#')) {
    console.warn('Invalid URL format for search item:', item)
    return false
  }

  return true
}

function removeDuplicates(items) {
  const seen = new Set()
  return items.filter((item) => {
    const key = `${item.to}-${item.type}`
    if (seen.has(key)) {
      console.warn('Duplicate search item removed:', item)
      return false
    }
    seen.add(key)
    return true
  })
}

function processArticlesData(articlesData) {
  if (!articlesData || !Array.isArray(articlesData)) {
    console.warn('Invalid articles data provided')
    return []
  }

  return articlesData
    .map((article) => ({
      id: article.id,
      title: article.title || 'Untitled Article',
      desc: article.description || article.desc || 'No description available',
      to: `/allNews/${article.id}`,
      type: 'Article',
      image: article.image || getImageByType('Article'),
      date: article.date,
      category: article.category,
      readTime: calculateReadTime(article.content || article.fullArticle || ''),
    }))
    .filter(validateSearchItem)
}

function processNavigationLinks(navigationLinks) {
  if (!navigationLinks || !Array.isArray(navigationLinks)) {
    console.warn('Invalid navigation links provided')
    return []
  }

  const navItems = navigationLinks
    .flatMap((link) => {
      if (link.submenu && link.items) {
        return link.items.map((item) => ({
          title: item.label || 'Unnamed Page',
          desc: `Navigation page: ${item.label}`,
          to: item.to || '#',
          type: 'Page',
          image: getImageByRoute(item.to),
        }))
      }
      return {
        title: link.label || 'Unnamed Page',
        desc: 'Main navigation page',
        to: link.to || '#',
        type: 'Page',
        image: getImageByRoute(link.to),
      }
    })
    .filter((item) => item.to !== '#')
    .filter(validateSearchItem)

  return navItems
}

export default function useSearchIndex() {
  const navigationLinks = useNavigationLinks()

  return useMemo(() => {
    const navItems = processNavigationLinks(navigationLinks)
    const articles = processArticlesData(articlesData)
    const validStaticPages = STATIC_PAGES.filter(validateSearchItem)
    const validProjectPages = PROJECT_PAGES.filter(validateSearchItem)
    const allItems = removeDuplicates([...navItems, ...articles, ...validStaticPages, ...validProjectPages])

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Search index built with:
        📄 ${navItems.length} navigation items
        📰 ${articles.length} articles
        🌐 ${validStaticPages.length} static pages
        🏗️ ${validProjectPages.length} project pages
        📊 Total: ${allItems.length} searchable items
      `)
    }

    return allItems
  }, [navigationLinks])
}

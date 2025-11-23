import FeaturedNews from '@/components/FeaturedNews'
import SearchResults from '@/components/SearchResults.jsx'

export default function Search() {
  return (
    <main className="relative z-10">
      <SearchResults />
      <FeaturedNews />
    </main>
  )
}

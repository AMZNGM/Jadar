import { Suspense } from 'react'
import FeaturedNews from '@/components/FeaturedNews'
import SearchResults from '@/components/SearchResults.jsx'

function SearchLoading() {
  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-bg text-text pt-44 max-lg:pt-34 pb-24 px-4 flex justify-center items-center">
      <div className="text-text/50">Loading search results...</div>
    </section>
  )
}

export default function Search() {
  return (
    <main className="relative z-10">
      <Suspense fallback={<SearchLoading />}>
        <SearchResults />
      </Suspense>
      <FeaturedNews />
    </main>
  )
}

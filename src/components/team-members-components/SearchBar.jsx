import { useTranslation } from '@/translations/useTranslation'

export default function SearchBar({ query, setQuery }) {
  const { t } = useTranslation()

  return (
    <div className="relative w-full z-10 py-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('SearchByNameOrRole')}
        className="relative py-14 w-full text-2xl font-light text-center duration-300 outline-none border-y border-main/30 text-main hover:bg-main/3"
      />
    </div>
  )
}

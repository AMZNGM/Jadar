import { useTranslation } from '@/translations/useTranslation'

export const useNavigationLinks = () => {
  const { t } = useTranslation()

  return [
    {
      label: t('about'),
      items: [
        { label: t('whatIsJadar'), to: '/about' },
        { label: t('leadership'), to: '/leadership' },
        { label: t('socialResponsibility'), to: '/socialResponsibility' },
      ],
    },
    {
      label: t('business'),
      items: [
        { label: t('projects'), to: '/projects' },
        { label: t('partners'), to: '/partners' },
      ],
    },
    {
      label: t('projects'),
      items: [
        { label: t('westAbdullahAlMubarakCity'), to: '/abdullaMubarak' },
        { label: t('eastSabahAlAhmadCity'), to: '/eastSabah' },
        { label: t('alMutlaaCity'), to: '/alMutlaa' },
        { label: t('levelsTower'), to: '/levelsTower' },
      ],
    },
    {
      label: t('news'),
      items: [
        { label: t('allNews'), to: '/allNews' },
        { label: t('mediaResources'), to: '/mediaResources' },
        { label: t('press'), to: '/press' },
      ],
    },
    {
      label: t('invest'),
      items: [
        { label: t('investInJadar'), to: '/investInJadar' },
        { label: t('jadarInvestmentOffice'), to: '/jadarInvestmentOffice' },
      ],
    },
    {
      label: t('careers'),
      items: [
        { label: t('workAtJadar'), to: '/workAtJadar' },
        { label: t('careerCenter'), to: '/careerCenter' },
      ],
    },
  ]
}

export const useFooterBottomLinks = () => {
  const { t } = useTranslation()

  return [
    {
      label: t('privacyPolicy'),
      to: '/privacyPolicy',
    },
    {
      label: t('termsOfUse'),
      to: '/termsOfUse',
    },
    {
      label: t('cookiePolicy'),
      to: '/cookiePolicy',
    },
  ]
}

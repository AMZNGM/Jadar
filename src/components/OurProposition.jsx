import { BgNoise } from "@/data/mediaData/svgs";
import { useTranslation } from "@/translations/useTranslation";
import ShinyText from "@/components/ui/text/ShinyText.jsx";
import SplitedText from "@/components/ui/text/SplitedText.jsx";

const OurProposition = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-12 text-main">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
          />
        </svg>
      ),
      title: t("card1title"),
      para: t("card1desc"),
    },
    {
      id: 2,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-12 text-main">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
      ),
      title: t("card2title"),
      para: t("card2desc"),
    },
    {
      id: 3,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-12 text-main">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      ),
      title: t("card3title"),
      para: t("card3desc"),
    },
    {
      id: 4,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-12 text-main">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
      title: t("card4title"),
      para: t("card4desc"),
    },
  ];

  return (
    <section dir="ltr" className="relative w-screen overflow-hidden bg-bg text-text pt-12 pb- 32 px-4">
      <BgNoise />

      <SplitedText
        text={t("ourProposition")}
        delay={50}
        tag="h3"
        className="text-main text-5xl max-md:text-4xl font-light uppercase -mb-6 -rotate-15"
      />

      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex flex-col justify-between items-center gap-4 w-full text-center font-light border border-main/30 py-12 px-4 z-10">
            {card.icon}

            <ShinyText text={card.title} speed={8} className="text-2xl" />

            <SplitedText text={card.para} delay={5} className="text-sm text-text/75" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProposition;

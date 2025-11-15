import { useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/translations/useTranslation";
import { ArtboardImgs } from "@/data/mediaData/artBoardImgs";
import ShuffleText from "@/components/ui/text/ShuffleText.jsx";

const WhoWeAre = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".masked-text").forEach((text) => {
      gsap.fromTo(
        text,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: text,
            start: "top 150%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "15% top",
        end: "+=1000",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      imgRef.current,
      { clipPath: "polygon(75% 50%, 50% 75%, 25% 50%, 50% 35%)" },
      // { clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)" }
      // { clipPath: "polygon(50% 90%, 100% 40%, 50% 40%, 0% 40%)" }
      { clipPath: "polygon(0% 50%, 100% 50%, 50% 100%, 80% 60%)" }
    );

    tl.fromTo(sectionRef.current, { backgroundColor: "#ededed" }, { backgroundColor: "#000" }, 0);
    gsap.utils.toArray(".toBlack").forEach((text) => {
      tl.to(text, { opacity: 0 }, 0);
    });
  }, [sectionRef, imgRef, containerRef, contentRef]);

  return (
    <section ref={sectionRef} className="relative w-screen h-[130vh] bg-text text-bg">
      <div ref={containerRef} className="flex justify-center items-center size-full">
        <div ref={contentRef} className="relative flex flex-col justify-between items-center size-full">
          <div className="toBlack relative flex flex-col justify-center items-center gap-4 mt-35 px-4">
            <ShuffleText
              text={t("whoWeAre")}
              tag="h2"
              className="masked-text text-xs md:text-[10px] tracking-[8px] md:tracking-[10px] uppercase"
            />
            <ShuffleText text={t("whoWeAreDisc")} tag="p" className="masked-text text-sm tracking-wide text-center" />
            <ShuffleText
              text={t("redefineHowSpacesServePeople")}
              tag="h1"
              className="masked-text text-4xl md:text-7xl md:tracking-[14px] leading-[0.9] text-center font-extralight uppercase mt-2 max-w-6xl"
            />
          </div>

          <div ref={imgRef} className="absolute inset-0 size-full overflow-hidden z-10 will-change-transform">
            <img
              src={ArtboardImgs[3]}
              alt="Background Image"
              // loading="lazy"
              className="size-full object-cover"
            />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: t("whoWeAreFooter") }}
            className="toBlack text-sm max-md:text-xs text-center font-light max-w-xl mb-45 px-4"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

import { useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/translations/useTranslation";
import { ArtboardImgs } from "@/data/mediaData/artBoardImgs";
import ShinyText from "@/components/ui/text/ShinyText.jsx";
import SplitedText from "@/components/ui/text/SplitedText.jsx";

const FloatingReports = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const bgImgRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  const imgsPositions = [
    { x: "70%", y: "5%", scale: "130%", inScale: "140%", clip: "inset(0% 20% 0% 0%)" },
    { x: "2%", y: "10%", scale: "100%", inScale: "190%", clip: "inset(10% 30% 0% 0%)" },
    { x: "40%", y: "20%", scale: "120%", clip: "inset(0% 0 50% 10%)" },
    { x: "30%", y: "37%", scale: "100%", inScale: "160%", clip: "inset(10% 20% 50% 0%)" },
    { x: "60%", y: "45%", scale: "120%", inScale: "140%", clip: "inset(10% 20% 20% 20%)" },
    { x: "30%", y: "60%", scale: "130%", clip: "inset(50% 20% 0 0)" },
    { x: "75%", y: "65%", scale: "160%", clip: "inset(0 0 40% 60%)" },
    { x: "10%", y: "30%", scale: "100%", inScale: "120%", clip: "inset(40% 30% 20% 0%)" },
    { x: "30%", y: "38%", scale: "110%", inScale: "120%", clip: "inset(20% 0% 0% 0%)" },
  ];

  useGSAP(() => {
    const container = containerRef.current;
    const bgImg = bgImgRef.current;

    imgsPositions.forEach((pos) => {
      const el = document.createElement("div");
      el.className = "overflow-hidden absolute w-48 h-48 pointer-events-none select-none md:w-64 md:h-64 opacity-35";
      el.style.left = pos.x;
      el.style.top = pos.y;
      el.style.clipPath = pos.clip;
      el.style.scale = pos.scale;

      const img = document.createElement("img");
      img.src = ArtboardImgs[0];
      img.className = "object-cover size-full";
      img.style.scale = pos.inScale;

      el.appendChild(img);
      bgImg.appendChild(el);
    });

    const items = bgImg.querySelectorAll("div");

    // parallax effect
    items.forEach((el, i) => {
      gsap.to(el, {
        y: `+=${500 + i * 100}`,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    gsap.fromTo(
      titleRef.current,
      { y: 200 },
      {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      paraRef.current,
      { y: 70 },
      {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      dir="ltr"
      ref={containerRef}
      className="relative w-screen min-h-screen h-[150vh] bg-black text-text overflow-hidden">
      <div className="flex flex-col justify-center items-center z-10">
        <div className="absolute inset-1/2 z-10 px-4 py-24 w-full text-center -translate-1/2">
          <div className="mx-auto mb-12 max-w-4xl">
            <div ref={titleRef}>
              <ShinyText
                text={t("jadarReports")}
                delay={45}
                tag="h2"
                className="mb-8 text-8xl font-extralight md:tracking-wide uppercase max-md:text-5xl"
              />
            </div>
            <div ref={paraRef}>
              <SplitedText
                text={t("jadarReportsDesc")}
                delay={2}
                tag="p"
                className="px-4 m-auto mt-12 max-w-5xl text-lg font-light tracking-wide leading-8 uppercase max-md:text-sm text-text/75"
              />
            </div>
          </div>
        </div>

        <div ref={bgImgRef} className="overflow-hidden absolute inset-0 bgImgs size-full" />
      </div>
    </section>
  );
};

export default FloatingReports;

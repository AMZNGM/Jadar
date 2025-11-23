import { useState } from "react";
import { BgNoise } from "@/data/mediaData/svgs.jsx";
import ParallaxElement from "@/components/ui/effects/ParallaxElement.jsx";
import Logo from "@/components/ui/logo.jsx";
import { useTranslation } from "@/translations/useTranslation";

const ProjLogo = ({ logoName, logoLink, look }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`relative w-screen overflow-hidden px-4 ${look === "dark" ? "bg-text text-bg" : "bg-bg text-text"}`}>
      <BgNoise />

      <div
        className={`relative flex justify-center items-center w-full h-100 border-t  ${
          look === "dark" ? "border-bgb" : "border-main/50"
        }`}>
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="z-10">
          <Logo
            logoName={logoName}
            to={logoLink}
            className={`w-130 ${look === "dark" ? "brightness-0" : "brightness-85 hover:brightness-100"} duration-300`}
          />
        </div>

        <span
          className={`absolute right-0 top-30 max-lg:top-20 leading-5 uppercase pointer-events-none select-none text-[15vw] text-main/10 duration-500 ease-in-out
            ${isHovered ? "opacity-100" : "opacity-0 right-5"}`}>
          {t("click")}
        </span>

        <ParallaxElement
          speed={0.45}
          direction="horizontal"
          ease="power2.out"
          className="leading-5 uppercase pointer-events-none select-none text-[15vw] text-main/10 z-0
          absolute right-200 max-xl:right-150 max-lg:right-120 max-md:right-100 max-sm:right-65">
          Shaping Life Shaping Life Shaping Life Shaping Life
          <br />
          Shaping Life Shaping Life Shaping Life Shaping Life
          <br />
          Shaping Life Shaping Life Shaping Life Shaping Life
          <br />
          Shaping Life Shaping Life Shaping Life Shaping Life
        </ParallaxElement>
      </div>
    </section>
  );
};

export default ProjLogo;

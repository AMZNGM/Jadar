import { useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";
import BgVideo from "@/components/ui/BgVideo.jsx";
import bgVid from "@/assets/videos/video2.webm";

const PartnersBgVid = () => {
  const sectionRef = useRef();
  const bgVidRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        pinSpacing: true,
        onLeaveBack: () => tl.pause(0),
      },
    });

    tl.to(bgVidRef.current, {
      opacity: 0.4,
      duration: 3,
      ease: "power2.inOut",
    }).to(bgVidRef.current, {
      scale: 3,
      duration: 5,
      ease: "power2.inOut",
    });

    tl.to({}, { duration: 0.5 });
  }, [sectionRef, bgVidRef]);

  return (
    <section ref={sectionRef} className="relative w-screen h-screen bg-bg">
      <BgVideo ref={bgVidRef} src={bgVid} className="will-change-transform will-change-opacity origin-center" />
    </section>
  );
};

export default PartnersBgVid;

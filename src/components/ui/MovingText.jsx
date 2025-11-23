import { useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";
import CircularText from "@/components/ui/text/CircularText.jsx";

const MovingText = ({
  projTitle,
  className = "",
  startScroll = "top center",
  endScroll = "bottom center",
  ease = "sine.inOut",

  startPosition = { x: 0, y: 0 },
  movementDistance = { x: 0, y: 0 },
  rotationSpeed = 1.5,

  enableXMovement = true,
  enableYMovement = true,
  enableRotation = true,
}) => {
  const containerRef = useRef(null);
  const circularTextRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !circularTextRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, {
        x: startPosition.x,
        y: startPosition.y,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          start: startScroll,
          end: endScroll,
          scrub: 1,
        },
      });

      if (enableXMovement) {
        tl.to(
          containerRef.current,
          {
            x: `+=${movementDistance.x}`,
            duration: 2,
            ease,
          },
          "<"
        );
      }

      if (enableYMovement) {
        tl.to(
          containerRef.current,
          {
            y: `+=${movementDistance.y}`,
            duration: 2,
            ease,
          },
          "<"
        );
      }

      if (enableRotation) {
        tl.to(
          circularTextRef.current,
          {
            rotation: 360 * rotationSpeed,
            duration: 2,
            ease: "none",
          },
          "<"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [
    projTitle,
    startScroll,
    endScroll,
    movementDistance.x,
    movementDistance.y,
    startPosition.x,
    startPosition.y,
    rotationSpeed,
    ease,
    enableXMovement,
    enableYMovement,
    enableRotation,
  ]);

  return (
    <section
      ref={containerRef}
      className={`sticky inset-0 z-40 pointer-events-none max-md:hidden rtl:hidden ${className}`}>
      <div ref={circularTextRef}>
        <CircularText text={`${projTitle} `} />
      </div>
    </section>
  );
};

export default MovingText;

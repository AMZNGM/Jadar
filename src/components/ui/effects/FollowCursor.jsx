import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";

const FollowCursor = ({
  isActive = true,
  offset = { x: 20, y: 20 },
  duration = 0.15,
  ease = "power2.out",
  scaleOnHover = 1,
  children,
  className = "",
  style = {},
  ...props
}) => {
  const cursorRef = useRef(null);
  const quickToRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const getOffset = useCallback(() => {
    return typeof offset === "function" ? offset() : offset;
  }, [offset]);

  const initQuickTo = useCallback(() => {
    if (!cursorRef.current || quickToRef.current) return;

    const cursor = cursorRef.current;

    gsap.set(cursor, {
      x: 0,
      y: 0,
      opacity: isActive ? 1 : 0,
    });

    quickToRef.current = gsap.quickTo(cursor, "x", {
      duration,
      ease,
      onUpdate() {
        gsap.set(cursor, { y: this.targets()[0]._gsap.y });
      },
    });

    gsap.quickTo(cursor, "y", { duration, ease });
  }, [duration, ease, isActive]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!quickToRef.current || !isActive) return;

      const currentOffset = getOffset();
      const targetX = e.clientX + currentOffset.x;
      const targetY = e.clientY + currentOffset.y;

      quickToRef.current(targetX);

      gsap.set(cursorRef.current, { y: targetY });
    },
    [isActive, getOffset]
  );

  const handleHover = useCallback(
    (isHovering) => {
      if (!cursorRef.current) return;

      gsap.to(cursorRef.current, {
        scale: isHovering ? scaleOnHover : 1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [scaleOnHover]
  );

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {}, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useGSAP(() => {
    if (!cursorRef.current) return;

    initQuickTo();

    if (isActive) {
      window.addEventListener("mousemove", handleMouseMove);
      gsap.set(cursorRef.current, { opacity: 1 });

      const hoverElements = document.querySelectorAll("[data-cursor-hover]");

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => handleHover(true));
        el.addEventListener("mouseleave", () => handleHover(false));
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);

        hoverElements.forEach((el) => {
          el.removeEventListener("mouseenter", () => handleHover(true));
          el.removeEventListener("mouseleave", () => handleHover(false));
        });
      };
    } else {
      gsap.set(cursorRef.current, { opacity: 0 });
    }
  }, [isActive, handleMouseMove, handleHover, initQuickTo]);

  useEffect(() => {
    return () => {
      if (quickToRef.current) {
        quickToRef.current = null;
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={cursorRef}
      className={`follow-cursor ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
        ...style,
      }}
      {...props}>
      {children}
    </div>
  );
};

export default FollowCursor;

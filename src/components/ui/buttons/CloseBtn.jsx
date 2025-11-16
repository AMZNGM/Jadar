import ClickEffect from "@/components/ui/effects/ClickEffect.jsx";
import { useLanguage } from "@/translations/LanguageContext";

const CloseBtn = ({ onClick, className = "", size = "md", type = "main", ariaLabel = "Close", ...props }) => {
  const { selectedLanguage } = useLanguage();
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const typeClasses = {
    main: "text-text hover:bg-main",
    sec: "text-main hover:bg-main hover:text-text",
    dark: "text-text hover:bg-bg",
    ghost: "text-text hover:bg-transparent",
  };

  return (
    <div
      onClick={onClick}
      className={`group absolute ${
        selectedLanguage === "ar" ? "right-4" : "right-4"
      } top-4 transition cursor-pointer outline-none z-40 ${typeClasses[type]} ${className}`}
      aria-label="Close"
      {...props}>
      <ClickEffect className="size-full p-2">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${sizeClasses[size]} transition-transform duration-300 group-hover:rotate-90 group-active:scale-90`}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </ClickEffect>
    </div>
  );
};

export default CloseBtn;

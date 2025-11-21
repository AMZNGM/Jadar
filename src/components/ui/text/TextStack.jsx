const TextStack = ({
  text = "Click to explore",
  className = "",
  textClassName = "",
  levels = 3,
  baseOpacity = 1,
  opacityStep = 0.25,
  textSize = "xs",
  tracking = "wider",
  leading = 8,
  uppercase = true,
  color = "text-main",
  align = "items-start",
}) => {
  const getOpacityClass = (index) => {
    if (index === 0) return "";
    const opacity = baseOpacity - index * opacityStep;
    return `opacity-${Math.round(opacity * 100)}`;
  };

  return (
    <div className={`flex flex-col ${align} ${className}`}>
      {Array.from({ length: levels }).map((_, index) => (
        <span
          key={index}
          className={`
            text-${textSize} 
            ${color} 
            tracking-${tracking} 
            leading-[${leading}px] 
            ${uppercase ? "uppercase" : ""} 
            block 
            ${textClassName}
            ${getOpacityClass(index)}
          `}>
          {text}
        </span>
      ))}
    </div>
  );
};

export default TextStack;

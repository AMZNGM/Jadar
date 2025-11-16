const ParallaxElement = ({
  children,
  speed = 0.5,
  direction = "vertical",
  ease = "none",
  start = "top bottom",
  end = "bottom top",
  scrub = true,
  origin = "center center",
  className = "",
  container = null,

  // Custom transform properties
  x = null,
  y = null,
  rotate = null,
  scale = null,
  opacity = null,

  // Tailwind breakpoint speed multipliers
  smSpeed = null, // 640px
  mdSpeed = null, // 768px
  lgSpeed = null, // 1024px
  xlSpeed = null, // 1280px
  xxlSpeed = null, // 1536px

  // Tailwind breakpoint directions
  smDirection = null,
  mdDirection = null,
  lgDirection = null,
  xlDirection = null,
  xxlDirection = null,

  // Disable on breakpoints
  disableSm = false,
  disableMd = false,
  disableLg = false,
  disableXl = false,
  disable2xl = false,

  // Tailwind breakpoint transform values
  smX = null,
  mdX = null,
  lgX = null,
  xlX = null,
  xxlX = null,
  smY = null,
  mdY = null,
  lgY = null,
  xlY = null,
  xxlY = null,
  smRotate = null,
  mdRotate = null,
  lgRotate = null,
  xlRotate = null,
  xxlRotate = null,
  smScale = null,
  mdScale = null,
  lgScale = null,
  xlScale = null,
  xxlScale = null,
  smOpacity = null,
  mdOpacity = null,
  lgOpacity = null,
  xlOpacity = null,
  xxlOpacity = null,

  // Legacy support (backward compatibility)
  mobileSpeed = null,
  tabletSpeed = null,
  mobileDirection = null,
  tabletDirection = null,
  disableMobile = false,
  disableTablet = false,

  ...props
}) => {
  const dataAttributes = {
    "data-scroll-speed": speed,
    "data-scroll-direction": direction,
    "data-scroll-ease": ease,
    "data-scroll-start": start,
    "data-scroll-end": end,
    "data-scroll-scrub": scrub.toString(),
    "data-scroll-origin": origin,
    ...props,
  };

  if (container) {
    dataAttributes["data-scroll-container"] = container;
  }

  // Add Tailwind breakpoint speed attributes
  if (smSpeed !== null) dataAttributes["data-sm-speed"] = smSpeed;
  if (mdSpeed !== null) dataAttributes["data-md-speed"] = mdSpeed;
  if (lgSpeed !== null) dataAttributes["data-lg-speed"] = lgSpeed;
  if (xlSpeed !== null) dataAttributes["data-xl-speed"] = xlSpeed;
  if (xxlSpeed !== null) dataAttributes["data-xxl-speed"] = xxlSpeed;

  // Add Tailwind breakpoint direction attributes
  if (smDirection !== null) dataAttributes["data-sm-direction"] = smDirection;
  if (mdDirection !== null) dataAttributes["data-md-direction"] = mdDirection;
  if (lgDirection !== null) dataAttributes["data-lg-direction"] = lgDirection;
  if (xlDirection !== null) dataAttributes["data-xl-direction"] = xlDirection;
  if (xxlDirection !== null) dataAttributes["data-xxl-direction"] = xxlDirection;

  // Add disable attributes
  if (disableSm) dataAttributes["data-disable-sm"] = "true";
  if (disableMd) dataAttributes["data-disable-md"] = "true";
  if (disableLg) dataAttributes["data-disable-lg"] = "true";
  if (disableXl) dataAttributes["data-disable-xl"] = "true";
  if (disable2xl) dataAttributes["data-disable-2xl"] = "true";

  // Add custom transform properties
  if (direction === "custom") {
    if (x !== null) dataAttributes["data-scroll-x"] = x;
    if (y !== null) dataAttributes["data-scroll-y"] = y;
    if (rotate !== null) dataAttributes["data-scroll-rotate"] = rotate;
    if (scale !== null) dataAttributes["data-scroll-scale"] = scale;
    if (opacity !== null) dataAttributes["data-scroll-opacity"] = opacity;

    // Add Tailwind breakpoint transform attributes
    if (smX !== null) dataAttributes["data-smX"] = smX;
    if (mdX !== null) dataAttributes["data-mdX"] = mdX;
    if (lgX !== null) dataAttributes["data-lgX"] = lgX;
    if (xlX !== null) dataAttributes["data-xlX"] = xlX;
    if (xxlX !== null) dataAttributes["data-xxlX"] = xxlX;

    if (smY !== null) dataAttributes["data-smY"] = smY;
    if (mdY !== null) dataAttributes["data-mdY"] = mdY;
    if (lgY !== null) dataAttributes["data-lgY"] = lgY;
    if (xlY !== null) dataAttributes["data-xlY"] = xlY;
    if (xxlY !== null) dataAttributes["data-xxlY"] = xxlY;

    if (smRotate !== null) dataAttributes["data-smRotate"] = smRotate;
    if (mdRotate !== null) dataAttributes["data-mdRotate"] = mdRotate;
    if (lgRotate !== null) dataAttributes["data-lgRotate"] = lgRotate;
    if (xlRotate !== null) dataAttributes["data-xlRotate"] = xlRotate;
    if (xxlRotate !== null) dataAttributes["data-xxlRotate"] = xxlRotate;

    if (smScale !== null) dataAttributes["data-smScale"] = smScale;
    if (mdScale !== null) dataAttributes["data-mdScale"] = mdScale;
    if (lgScale !== null) dataAttributes["data-lgScale"] = lgScale;
    if (xlScale !== null) dataAttributes["data-xlScale"] = xlScale;
    if (xxlScale !== null) dataAttributes["data-xxlScale"] = xxlScale;

    if (smOpacity !== null) dataAttributes["data-smOpacity"] = smOpacity;
    if (mdOpacity !== null) dataAttributes["data-mdOpacity"] = mdOpacity;
    if (lgOpacity !== null) dataAttributes["data-lgOpacity"] = lgOpacity;
    if (xlOpacity !== null) dataAttributes["data-xlOpacity"] = xlOpacity;
    if (xxlOpacity !== null) dataAttributes["data-xxlOpacity"] = xxlOpacity;
  }

  // Legacy support (backward compatibility)
  if (mobileSpeed !== null) dataAttributes["data-mobile-speed"] = mobileSpeed;
  if (tabletSpeed !== null) dataAttributes["data-tablet-speed"] = tabletSpeed;
  if (mobileDirection !== null) dataAttributes["data-mobile-direction"] = mobileDirection;
  if (tabletDirection !== null) dataAttributes["data-tablet-direction"] = tabletDirection;
  if (disableMobile) dataAttributes["data-disable-mobile"] = "true";
  if (disableTablet) dataAttributes["data-disable-tablet"] = "true";

  return (
    <div {...dataAttributes} className={`ParallaxElement ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxElement;

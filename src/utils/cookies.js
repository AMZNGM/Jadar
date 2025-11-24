export const setCookie = (name, value, days = 30, options = {}) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);

  const defaultOptions = {
    expires: d.toUTCString(),
    path: "/",
    SameSite: "Lax",
    ...(window.location.protocol === "https:" && { Secure: true }),
  };

  const cookieOptions = { ...defaultOptions, ...options };

  const cookieString = `${name}=${encodeURIComponent(value)};${Object.entries(cookieOptions)
    .filter(([_, val]) => val !== undefined)
    .map(([key, val]) => `${key}=${val}`)
    .join(";")}`;

  document.cookie = cookieString;
};

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

export const eraseCookie = (name, path = "/", domain = null) => {
  const options = [`${name}=`, "expires=Thu, 01 Jan 1970 00:00:00 GMT", `path=${path}`];

  if (domain) {
    options.push(`domain=${domain}`);
  }

  document.cookie = options.join(";");
};

export const getAllCookies = () => {
  const cookies = {};
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
};

export const clearAllCookies = (exceptions = ["jadar_consent"]) => {
  const cookies = getAllCookies();

  Object.keys(cookies).forEach((cookieName) => {
    if (!exceptions.includes(cookieName)) {
      eraseCookie(cookieName);
    }
  });
};

export const validateConsent = (requiredCategory) => {
  const consentData = localStorage.getItem("jadar.consent.preferences");

  if (!consentData) return false;

  try {
    const prefs = JSON.parse(consentData);
    return prefs[requiredCategory] === true;
  } catch {
    return false;
  }
};

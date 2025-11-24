import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading or wait for actual assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // ⏳ replace with your real loading logic
    return () => clearTimeout(timer);
  }, []);

  return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

import { createContext, useState, useEffect } from "react";

export const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(360);
  const [isValidScreenSize, setIsValidScreenSize] = useState(true);

  useEffect(() => {
    if (screenSize > 480 || screenSize < 360) {
      setIsValidScreenSize(false);
    } else setIsValidScreenSize(true);
  }, [screenSize]);

  return (
    <ScreenSizeContext.Provider
      value={{
        screenSize,
        setScreenSize,
        isValidScreenSize,
      }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};

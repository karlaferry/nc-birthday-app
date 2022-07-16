import { createContext, useState } from "react";

export const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState({});

  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

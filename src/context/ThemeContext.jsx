import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const MODE = {
  LIGHT: "light",
  DARK: "dark",
};

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(MODE.LIGHT);
  const isDarkMode = theme === MODE.DARK;
  const toggleMode = () => {
    setTheme((prev) => {
      if (prev === MODE.LIGHT) {
        return MODE.DARK;
      } else {
        return MODE.LIGHT;
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

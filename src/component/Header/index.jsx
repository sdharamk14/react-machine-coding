import { useEffect } from "react";
import { MODE, useTheme } from "../../context/ThemeContext";
import "./header.css";

const Header = () => {
  const { isDarkMode, toggleMode } = useTheme();

  useEffect(() => {
    const tag = document.getElementsByTagName("body");
    const value = isDarkMode ? MODE.DARK : MODE.LIGHT;
    tag[0].setAttribute("data-mode", value);
  }, [isDarkMode]);

  return (
    <div className="header">
      Interview Questions
      <div>
        <button onClick={toggleMode}>{`${
          isDarkMode ? "Dark" : "Light"
        } Mode`}</button>
      </div>
    </div>
  );
};

export default Header;

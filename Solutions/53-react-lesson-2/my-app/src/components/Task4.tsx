import React, { useState } from "react";
import CardBottom from "./CardBottom";
import CardTop from "./CardTop";
import Switch from "./MuiSwitch";

function Task4() {
  const [theme, setTheme] = useState("light");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="task4" data-theme={theme}>
      <Switch id="themeButton" onChange={switchTheme}></Switch>
      <CardTop />
      <CardBottom />
    </div>
  );
}

export default Task4;

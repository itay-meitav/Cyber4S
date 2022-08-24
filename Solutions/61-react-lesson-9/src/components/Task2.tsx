import React, { createContext, useContext, useState } from "react";
import ClassChild from "./ClassChild";
import FunctionChild from "./FunctionChild";
export const ThemeContext = React.createContext(false);

function Task2() {
  const [dark, setDark] = useState(false);
  return (
    <>
      <ThemeContext.Provider value={dark}>
        <FunctionChild />
        <ClassChild />
        <button onClick={() => setDark(!dark)}>Change Theme!</button>
      </ThemeContext.Provider>
    </>
  );
}

export default Task2;

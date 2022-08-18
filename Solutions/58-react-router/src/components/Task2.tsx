import React, { useRef, useState } from "react";

function Task2() {
  const div = useRef<HTMLDivElement>(null);

  function handleClick() {
    div.current!.style.backgroundColor = "blue";
  }

  return (
    <div>
      <button onClick={() => handleClick()}>change color!</button>
      <div
        ref={div}
        style={{ width: "300px", height: "300px", backgroundColor: "red" }}
      ></div>
    </div>
  );
}

export default Task2;

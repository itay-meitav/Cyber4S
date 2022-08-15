import React, { useState } from "react";
import Dice from "./Dice";

function Task4() {
  const [roll, setRoll] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);

  return (
    <div className="task4">
      <Dice roll={roll} number={number} />
      <input
        disabled={roll}
        type="range"
        pattern=""
        value={number}
        id="cubes"
        name="cubes"
        min="1"
        max="10"
        onChange={(e) => {
          const val = Number(e.currentTarget.value);
          setNumber(val);
        }}
        step="1"
      />
      <label>Number of Dice:</label>
      <input
        disabled={roll}
        id="number"
        type={"number"}
        onChange={(e) => {
          const val = Number(e.currentTarget.value);
          if (val <= 10 && val >= 1) setNumber(val);
        }}
        min={1}
        max={10}
        value={number}
      />
      <button
        disabled={roll}
        id="roll"
        onClick={() => {
          setRoll(true);
          setTimeout(() => {
            setRoll(false);
          }, 3000);
        }}
      >
        Roll
      </button>
    </div>
  );
}

export default Task4;

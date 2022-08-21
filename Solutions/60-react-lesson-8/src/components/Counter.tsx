import React, { useEffect, useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("initial render");
  }, []);

  useEffect(() => {
    console.log("number has changed!");
  }, [number]);

  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("cleaned up!");
    };
  });

  return (
    <>
      <h1>{number}</h1>
      <div className="buttons">
        <button onClick={() => setNumber(number + 1)}>Increase</button>
        <button onClick={() => setNumber(number - 1)}>Decrease</button>
        <button onClick={() => setNumber(0)}>Reset</button>
      </div>
    </>
  );
}

export default Counter;

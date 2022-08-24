import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCount,
} from "./counterSlice";

function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector<number>(selectCount);
  const [incrementAmount, setIncrementAmount] = useState("2");
  const incrementValue = Number(incrementAmount);
  return (
    <>
      <div className="row">
        <button
          className="button"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className="value">{count}</span>
        <button
          className="button"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className="row">
        <input
          className="textbox"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="button"
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className="button"
          onClick={() => {
            setIncrementAmount("0");
            dispatch(reset());
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default Counter;

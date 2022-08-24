import React, { useReducer } from "react";

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  NEW_USER_INPUT: "new user input",
  TOGGLE_COLOR: "toggle color",
};

type action = {
  type: string;
  payload?: string;
};

const reducer = (state: React.ComponentState, action: action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTIONS.NEW_USER_INPUT:
      return { ...state, input: action.payload };
    case ACTIONS.TOGGLE_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error();
  }
};

function Task2() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    color: false,
    input: "",
  });
  return (
    <div className="task2" style={{ color: state.color ? "#FFF" : "#980098" }}>
      <h1>{state.count}</h1>
      <div className="buttons">
        <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_COLOR })}>
          Change color
        </button>
      </div>
      <input
        type="text"
        value={state.input}
        onChange={(e) => {
          const val = e.currentTarget.value;
          dispatch({ type: ACTIONS.NEW_USER_INPUT, payload: val });
        }}
      ></input>
      <p>{state.input}</p>
    </div>
  );
}

export default Task2;

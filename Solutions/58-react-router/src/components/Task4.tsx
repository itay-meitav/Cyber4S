import React from "react";
import { Link } from "react-router-dom";

function Task4() {
  return (
    <div className="task4">
      <Link to={"/task4/1"}>sock 1</Link>
      <Link to={"/task4/2"}>sock 2</Link>
      <Link to={"/task4/3"}>sock 3</Link>
      <Link to={"/task4/4"}>sock 4</Link>
      <Link to={"/task4/5"}>sock 5</Link>
      <Link to={"/task4/6"}>sock 6</Link>
    </div>
  );
}

export default Task4;

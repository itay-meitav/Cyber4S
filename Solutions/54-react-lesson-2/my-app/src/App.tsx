import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Counter from "./components/Counter";
import Task2 from "./components/Task2";
import Task3 from "./components/Task3";
import Task4 from "./components/Task4";

function App() {
  return (
    <Router>
      <div className="links">
        <Link to={"/"}>Task 2</Link>
        <Link to={"/task3"}>Task 3</Link>
        <Link to={"/task4"}>Task 4</Link>
        <Link to={"/counter"}>Counter</Link>
      </div>
      <Routes>
        <Route path="/" element={<Task2 />} />
        <Route path="/task3" element={<Task3 />} />
        <Route path="/task4" element={<Task4 />} />
        <Route path="/counter" element={<Counter count={0} />} />
      </Routes>
    </Router>
  );
}

export default App;

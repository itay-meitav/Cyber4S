import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Task2 from "./components/Task2";
import Task3 from "./components/Task3";

function App() {
  return (
    <Router>
      <div className="links">
        <Link to={"/"}>Task 2</Link>
        <Link to={"/task3"}>Task 3</Link>
      </div>
      <Routes>
        <Route path="/" element={<Task2 />} />
        <Route path="/task3" element={<Task3 />} />
      </Routes>
    </Router>
  );
}

export default App;

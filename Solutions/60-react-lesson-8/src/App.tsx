import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Task2 from "./components/Task2";

function App() {
  return (
    <Router>
      <div className="links">
        <Link to={"/"}>Both Tasks</Link>
      </div>
      <Routes>
        <Route path="/" element={<Task2 />} />
      </Routes>
    </Router>
  );
}

export default App;

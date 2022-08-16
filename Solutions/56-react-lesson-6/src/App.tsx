import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import Task3 from "./components/Task3";

function App() {
  return (
    <Router>
      <div className="links">
        <Link to={"/"}>Task 3</Link>
      </div>
      <Routes>
        <Route path="/" element={<Task3 />} />
      </Routes>
    </Router>
  );
}

export default App;

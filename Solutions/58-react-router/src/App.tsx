import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import Socks from "./components/Socks";
import Task2 from "./components/Task2";
import Task4 from "./components/Task4";

function App() {
  return (
    <Router>
      <div className="links">
        <Link to={"/"}>Task 2</Link>
        <Link to={"/task4"}>Task 4</Link>
      </div>
      <Routes>
        <Route path="/" element={<Task2 />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route path="/task4">
          <Route index element={<Task4 />} />
          <Route path=":sockId" element={<Socks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

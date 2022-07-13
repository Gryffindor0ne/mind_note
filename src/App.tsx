import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import List from "@pages/DiaryList";
import Diary from "@pages/Diary";
import New from "@pages/NewDiary";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to="/diary" />} />
      <Route path="/diary" element={<List />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="/diary/new" element={<New />} />
    </Routes>
  </Router>
);

export default App;

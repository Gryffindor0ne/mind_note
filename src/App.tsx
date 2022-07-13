import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import DiaryList from "@pages/DiaryList";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DiaryList />} />
    </Routes>
  </Router>
);

export default App;

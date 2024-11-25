import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "../Visiteur/Main/Contact/page.js";
import Home from "../Visiteur/Main/Home/page.js";

function Visiteur() {
  return (
    <div class="main">
      <Router>
        <p>a</p>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="*" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Visiteur;

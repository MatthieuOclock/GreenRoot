import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "../Visiteur/Main/Contact/page.js";
import Home from "../Visiteur/Main/Home/page.js";
import Head from "../Visiteur/Header/head.js";
import Footer from "../Visiteur/Footer/footer.js";

function Visiteur() {
  return (
    <div class="main">
      <Router>
        <Head />
        <Home />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default Visiteur;

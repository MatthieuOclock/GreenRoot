import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "./Main/Contact/page.js";
import Home from "./Main/Home/page.js";
import SingIn from "./Main/Login/page.js"; 
import Head from "./Header/head.js";
import Footer from "./Footer/footer.js";

function Visiteur() {
  return (
    <div class="main">
      <Router>
        <Head />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="GreenRoot/Home" element={<Home />} />
          <Route path="GreenRoot/contact" element={<Contact />} />
          <Route path="GreenRoot/singIn" element={<SingIn/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default Visiteur;

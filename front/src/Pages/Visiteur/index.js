import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./Main/Contact/page.js";
import Home from "./Main/Home/page.js";
import Login from "./Main/Login/page.js";
import SignIn from "./Main/SignIn/page.js";
import Header from "./Header/header.js";
import Footer from "./Footer/footer.js";
import Campains from "./Main/Campains/page.js";
import Trees from "./Main/Trees/page.js";

function Visiteur() {
  return (
    <div class="main">
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="GreenRoot/Acceuil" element={<Home />} />
          <Route path="GreenRoot/contact" element={<Contact />} />
          <Route path="GreenRoot/connexion" element={<Login />} />
          <Route path="GreenRoot/inscription" element={<SignIn />} />
          <Route path="GreenRoot/campagnes" element={<Campains />} />
          <Route path="GreenRoot/arbres" element={<Trees />} />

          {/* <Route path="/a-propos" element={<APropos />} />
          <Route path="/campagne/:campainId" element={<Campain />} />
          
          <Route path="/arbre/:treeId" element={<Tree />} />
          
          <Route path="/connexion" element={<Login />} />
          <Route path="/mentions-legales" element={<LegalNotices />} />
          <Route path="/profil" element={<User />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/paiement" element={<Payment />} />
          <Route path="/commande" element={<Command />} />
          <Route
            path="/confirmation-commande"
            element={<ConfirmationCommand />}
          />
          <Route path="/admin" element={<Administrateur />} /> */}
        </Routes>
        <ToastContainer />
        <Footer />
      </Router>
    </div>
  );
}

export default Visiteur;

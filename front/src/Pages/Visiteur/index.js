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
import About from "./Main/APropos/page.js";
import LegalNotices from "./Main/LegalNotices/page.js";
import User from "../Membre/User/page.js";
import Panier from "./Main/Panier/page.js";
import Command from "./Main/Commande/page.js";
import Payment from "./Main/Payment/page.js";
import Campain from "./Main/Campain/page.js";
import Tree from "./Main/Tree/page.js";
import ConfirmationCommand from "./Main/ConfirmationCommand/page.js";
import Administrateur from "./Main/BackOffice/Administateur/page.js";

import LoginTest from "../Membre/index.js";

function Visiteur() {
  return (
    <div class="main">
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/GreenRoot/Acceuil" element={<Home />} />
          <Route path="/GreenRoot/contact" element={<Contact />} />
          <Route path="/GreenRoot/connexion" element={<Login />} />
          <Route path="/GreenRoot/inscription" element={<SignIn />} />
          <Route path="/GreenRoot/campagnes" element={<Campains />} />
          <Route path="/GreenRoot/arbres" element={<Trees />} />
          <Route path="/GreenRoot/a-propos" element={<About />} />
          <Route
            path="/GreenRoot/mentions-legales"
            element={<LegalNotices />}
          />
          <Route path="/GreenRoot/profil" element={
            <LoginTest>
              <User />
            </LoginTest>
            } />
          <Route path="/GreenRoot/panier" element={<Panier />} />
          <Route path="/GreenRoot/commande" element={<Command />} />
          <Route path="/GreenRoot/paiement" element={<Payment />} />
          <Route path="/GreenRoot/campagne/:campainId" element={<Campain />} />
          <Route path="/GreenRoot/arbre/:treeId" element={<Tree />} />
          <Route
            path="/GreenRoot/confirmation-commande"
            element={<ConfirmationCommand />}
          />
          <Route path="/GreenRoot/admin" element={<Administrateur />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </Router>
    </div>
  );
}

export default Visiteur;

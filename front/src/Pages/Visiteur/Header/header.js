import Search from "../Search";
import Logo from "./logo-greenroots.png";
import React, { useState, useEffect } from "react";
import person from "./person.png";

// Dans le header nous avons mis des liens vers les pages campagnes et arbres.
// Nous utilisons aussi les composants Search et MySpace.

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.URL_API}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Déconnexion réussie!");
        localStorage.removeItem("token");
        window.location.href = "/connexion"; // Redirige vers la page de connexion
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      alert("Erreur lors de la déconnexion. Veuillez réessayer plus tard.");
    }
  };

  return (
    <>
      <header role="banner">
        <nav
          role="navigation"
          aria-label="Menu principal"
          className="menu_container"
        >
          <div className="logo">
            <a href="/GreenRoot/">
              <img loading="lazy" src={Logo} alt="GreenRoots (logo)"></img>
            </a>
          </div>
          <ul className="menu_list">
            <li className="menu_list-item">
              <a href="/GreenRoot/campagnes">Toutes les campagne</a>
            </li>
            <li className="menu_list-item">
              <a href="/GreenRoot/arbres">Catalogue d'Arbre</a>
            </li>
            <li>
              <img
                loading="lazy"
                className="profil"
                src={person}
                alt="person"
              />
            </li>
            <li>
              {isLoggedIn ? (
                <>
                  <a href="/GreenRoot/profil">Mon espace</a>
                </>
              ) : (
                <>
                  <a href="/GreenRoot/connexion">Connexion</a>
                </>
              )}
            </li>
            <li>
              {isLoggedIn ? (
                <>
                  <button onClick={handleLogout}>Déconnexion</button>
                </>
              ) : (
                <>
                  <a href="/GreenRoot/inscription">Inscription</a>
                </>
              )}
            </li>
            <li>
              <Search />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

import React, { useState, useEffect } from "react";

import person from "./person.png";

const MySpace = () => {
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
      <div className="myspace-container">
        <img loading="lazy" className="logo" src={person} alt="person" />
        <div className="burger">
          <div className="MySpace">
            {isLoggedIn ? (
              <>
                <a href="/profil">Mon espace</a>
                <button onClick={handleLogout}>Déconnexion</button>
              </>
            ) : (
              <>
                <div className="menu">
                  <nav>
                    <ul>
                      <li>
                        <a href="/connexion">Connexion</a>
                      </li>
                      <li>
                        <a href="/inscription">Inscription</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MySpace;

import Search from "../Search/index.js";
import Logo from "./logo-greenroots.png";
import person from "./person.png";
import islogin from "./verify.js";
import deco from "./deconnexion.js";
// Dans le header nous avons mis des liens vers les pages campagnes et arbres.
// Nous utilisons aussi les composants Search et MySpace.

const Header = () => {

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
              {islogin ? (
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
              {islogin ? (
                <>
                  <button onClick={deco}>Déconnexion</button>
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

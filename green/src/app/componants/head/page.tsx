// Dans le header nous avons mis des liens vers les pages campagnes et arbres.
// Nous utilisons aussi les composants Search et MySpace.

const Header = () => {
    return (
        <>
            <header role="banner">
                <nav role="navigation" aria-label="Menu principal" className="menu_container">
                    <ul className="menu_list">
                        <li className="menu_list-item"><a href="/">image</a></li>
                        <li className="menu_list-item"><a href="/campagnes">Toutes les campagne</a></li>
                        <li className="menu_list-item"><a href="/arbres">Catalogue d Arbre</a></li>
                    </ul>
                </nav>
                <div className="container-search-myspace">
                <form role="search" className="search">
                <label htmlFor="site-search" className='site-search'></label>
                <input
                    type="search"
                    title="Recherche par mots-clés"
                    placeholder="Rechercher..."
                    id="site-search"
                    name="q"
                />
                <button type="submit">Search</button>
            </form>
                </div>
            </header>
        </>
    )
}

export default Header;
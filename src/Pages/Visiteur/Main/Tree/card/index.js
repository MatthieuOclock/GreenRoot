import React, { useContext } from 'react';
import { CartContext } from '../../../components/App/CardContext';

const CardTree = ({ treeId, race, price, description, status, picture }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="container-tree">
            <h2>{race}</h2>
            <a className="repo" href={`/arbre/${treeId}`} >
                <img loading="lazy" src={`${process.env.URL_API}${picture}`} alt="arbre" />
                <div className="tree-info">
                    <h3>{price}</h3>
                    <p>{description}</p>
                    <p>{status}</p>
                </div>
            </a>
            <button onClick={() => {
                addToCart({ race, price, description, status, picture });
                alert('Votre arbre a été ajouté au panier');
            }}>
                Ajouter au panier
            </button>

        </div >
    );
}

export default CardTree;
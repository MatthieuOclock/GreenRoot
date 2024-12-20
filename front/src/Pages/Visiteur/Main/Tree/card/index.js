import React, { useContext } from 'react';
import { CartContext } from '../../../../../CardContext.js';

const CardTree = ({ treeId, race, price, description, status, picture}) => {
    const context = useContext(CartContext);
    console.log("ok",context)
    return (
        <div className="container-tree">
            <h2>{race}</h2>
            <a className="repo" href={`/greenroot/arbres/${treeId}`} >
                <img loading="lazy" src={`http://localhost:1234/${picture}`} alt="arbre" />
                <div className="tree-info">
                    <h3>{price}</h3>
                    <p>{description}</p>
                    <p>{status}</p>
                </div>
            </a>
            <button onClick={() => {
                context.addToCart({ race, price, description, status, picture });
                alert('Votre arbre a été ajouté au panier');
            }}>
                Ajouter au panier
            </button>

        </div >
    );
}

export default CardTree;
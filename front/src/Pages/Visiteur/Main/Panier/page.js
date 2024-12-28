import React, { useContext } from 'react';
import { CartContext } from '../../../../CardContext.js';

const Panier = () => {
    const { panier, incrementQuantity, decrementQuantity, clearCart } = useContext(CartContext);
    console.log(panier);
    return (
        <>
            <h1>Panier</h1>
            <div className="panier-container">
                <div className="produits">
                    {panier.length > 0 ? (
                        panier.map((tree, index) => (
                            <div key={index} className="produit">
                                <img loading="lazy" src={`http://localhost:1234/${tree.picture}`} alt='arbre' className="produit-image" />
                                <div className="produit-details">
                                    <h2>{tree.race}</h2>
                                    <p>Prix: {tree.price}€</p>
                                    <div className="quantite">
                                        <button onClick={() => decrementQuantity(tree.id)}>-</button>
                                        <span>{tree.quantity}</span>
                                        <button onClick={() => incrementQuantity(tree.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Votre panier est vide.</p>
                    )}
                </div>
                <div className="total">
                    <h2>Total: {panier.reduce((total, tree) => total + tree.price * tree.quantity, 0)}€</h2>
                    <a href='/Greenroot/paiement'>Passer à la page de paiement</a>
                    <button onClick={clearCart} className="clear-button">Vider le panier</button>
                </div>
            </div>
        </>
    );
};

export default Panier;

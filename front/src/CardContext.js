import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext({ 
    panier: [], 
    addToCart : () => {}, 
    incrementQuantity : () => {}, 
    decrementQuantity : () => {}, 
    clearCart : () => {}
});

export const CartProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    // Chargement initial des données du panier à partir du localStorage
    useEffect(() => {
        const storedPanier = localStorage.getItem('panier');
        try {
            if (storedPanier) {
                setPanier(JSON.parse(storedPanier));
            }
        } catch (error) {
            console.error("Erreur lors du parsing du localStorage:", error);
            setPanier([]); // Réinitialisation en cas de données corrompues
        }
    }, []);

    // Sauvegarde du panier dans le localStorage à chaque mise à jour
    useEffect(() => {
        localStorage.setItem('panier', JSON.stringify(panier));
    }, [panier]);

    // Fonction pour ajouter un article au panier
    const addToCart = (tree) => {
        console.log("Ajout au panier:", tree);
        const uniqueId = uuidv4();  // Génére un identifiant unique
        setPanier((prevPanier) => {
            const treeExists = prevPanier.find(item => item.id === uniqueId);
            if (treeExists) {
                return prevPanier.map(item =>
                    item.id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevPanier, { ...tree, id: uniqueId, quantity: 1 }];
            }
        });
    };


    // Fonction pour incrémenter la quantité d'un article
    const incrementQuantity = (id) => {
        setPanier((prevPanier) =>
            prevPanier.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Fonction pour décrémenter la quantité d'un article
    const decrementQuantity = (id) => {
        setPanier((prevPanier) =>
            prevPanier
                .map(item =>
                    item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0) // Supprime les articles avec une quantité de 0
        );
    };

    // Fonction pour vider complètement le panier
    const clearCart = () => {
        setPanier([]);
    };

    return (
        <CartContext.Provider value={{ panier, addToCart, incrementQuantity, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
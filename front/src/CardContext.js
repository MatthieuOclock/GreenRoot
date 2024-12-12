import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    useEffect(() => {
        const storedPanier = localStorage.getItem('panier');
        if (storedPanier) {
            setPanier(JSON.parse(storedPanier));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('panier', JSON.stringify(panier));
    }, [panier]);

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

    const incrementQuantity = (id) => {
        setPanier((prevPanier) =>
            prevPanier.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setPanier((prevPanier) =>
            prevPanier.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setPanier([]);
    };

    return (
        <CartContext.Provider value={{ panier, addToCart, incrementQuantity, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

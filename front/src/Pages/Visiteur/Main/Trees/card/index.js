import React, { useContext } from "react";
import { CartContext } from "../../../../../CardContext.js";
import { toast } from "react-toastify";

const CardTree = ({ treeId, race, price, description, status, picture }) => {
  const {addToCart} = useContext(CartContext);
  console.log(addToCart); 
  const handleAddToCart = () => {
    addToCart({ treeId, race, price, description, status, picture });
    console.log({ treeId, race, price, description, status, picture })
    toast.success("Votre arbre a été ajouté au panier");
  };

  return (
    <div className="card-trees">
      <a className="repo" href={`/GreenRoot/arbres/${treeId}`}>
        <img
          loading="lazy"
          src={`http://localhost:1234/${picture}`}
          alt="arbre"
        />
        <div className="trees-info">
          <h2>{race}</h2>
          <h3>{price}</h3>
          <p>{description}</p>
          <p>{status}</p>
        </div>
      </a>
      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </div>
  );
};

export default CardTree;

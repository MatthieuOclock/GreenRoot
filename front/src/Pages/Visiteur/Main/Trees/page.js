import { useState, useEffect, useContext } from "react";
import CardTree from "./card";
import { CartContext } from "../../../../CardContext";

function Trees() {
  const [trees, setTrees] = useState([]);
  const { addToCart } = useContext(CartContext);

  // console.log(trees[2].id);
  const getTrees = async () => {
    try {
      const response = await fetch(`${process.env.URL_API}tree`);
      const data = await response.json();
      setTrees(data);
    } catch (error) {
      console.error("Erreur de récupération des arbres:", error);
      alert("Erreur de récupération");
    }
  };

  useEffect(() => {
    getTrees();
  }, []);

  return (
    <>
      <h1>Liste d'arbres</h1>
      <div>
        {trees.length > 0 ? (
          <div className="card">
            {trees.map((tree, index) => (
              <CardTree
                key={index}
                treeId={tree.id}
                race={tree.race}
                price={tree.price}
                description={tree.description}
                picture={tree.picture}
                status={tree.status}
                addToCart={() => addToCart(tree)} // Utilisation du contexte
              />
            ))}
          </div>
        ) : (
          <p>Aucun arbre trouvé.</p>
        )}
        <a className="panier" href="/panier">
          Voir mon panier
        </a>
      </div>
    </>
  );
}

export default Trees;

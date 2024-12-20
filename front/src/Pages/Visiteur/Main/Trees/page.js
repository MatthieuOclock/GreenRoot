import { useState, useEffect, useContext } from "react";
import CardTree from "./card/index.js";

function Trees() {
  const [trees, setTrees] = useState([]);
  // console.log(trees[2].id);
  const getTrees = async () => {
    try {
      const response = await fetch(`http://localhost:1234/tree`);
      const data = await response.json();
      setTrees(data.data);
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

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../../../CardContext.js';
import CardTree from './card/index.js'; 


function Tree() {
    const [tree, setTree] = useState([]);
    const { addToCart } = useContext(CartContext);
    let { treeId } = useParams();
    console.log(treeId);

    const getTree = async () => {
        try {
            const response = await fetch(`http://localhost:1234/tree/${treeId}`);
            const data = await response.json();
            setTree(data.data);
            console.log(data);

        } catch (error) {
            console.error('Erreur de récupération des arbres:', error);
            alert('Erreur de récupération');
        }
    };

    useEffect(() => {
        getTree();
    }, []);

    return (
        <>
            <h1>Mon arbre</h1>
            <div className='card-container'>
                <div className="card-tree">
                    <CardTree
                        // key={index}
                        treeId={tree.id}
                        race={tree.race}
                        price={tree.price}
                        description={tree.description}
                        picture={tree.picture}
                        status={tree.status}
                        addToCart={() => addToCart(tree)} // Utilisation du contexte
                    />
                </div>
            </div>

        </>
    );
};

export default Tree;
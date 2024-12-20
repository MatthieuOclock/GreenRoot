import Tree from "../../models/tree.js"; 

async function allTree() {
    try {
        const trees = await Tree.findAll();
        const itemsTree = []; 
        trees.forEach(tree => {
            //console.log(user); 
            //console.log(user.dataValues.id); 
            itemsTree.push(tree); 
        });

        return itemsTree; 
    } catch (error) {
        return `Error fetching tree: ${error}`;
    }
}

export default allTree(); 
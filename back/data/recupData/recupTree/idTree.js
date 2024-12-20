import Tree from "../../models/tree.js";

async function idTree(id) {
    try {  
        const tree = await Tree.findAll({ where: {id}}); 
        return tree[0].dataValues; 
    } catch (error){ 
        console.log(`Error fetching tree: ${error}`); 
        return []; 
    }
}

export default idTree; 
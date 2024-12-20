import Campain from "../../models/campain.js"; 

async function idCampain(id) {
    try{ 
        const campain = await Campain.findAll({ where: { id } });
        return campain[0].dataValues; 

    } catch (error){ 
        console.log(`Error fetching campain: ${error}`); 
        return []; 
    }
}

export default idCampain; 
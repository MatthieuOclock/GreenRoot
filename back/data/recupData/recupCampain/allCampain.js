import Campain from "../../models/campain.js"; 

async function allCampain() {
    try{ 
        const campains = await Campain.findAll(); 
        const itemsCampain = []; 
        campains.forEach(campain => { 
            //console.log("ok")
            //console.log(campain.dataValues); 
            itemsCampain.push(campain.dataValues); 
        }); 

        return itemsCampain; 

    } catch (error){ 
        console.log(`Error fetching campain: ${error}`); 
        return []; 
    }
}

export default allCampain(); 
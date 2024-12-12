import User from "../../models/user.js";

async function allUser() {
    try{ 
        const users = await User.findAll(); 
        const itemsUser = []; 
        users.forEach(user => { 
            //console.log("ok")
            //console.log(campain.dataValues); 
            itemsUser.push(user.dataValues); 
        }); 

        return itemsUser; 

    } catch (error){ 
        console.log(`Error fetching user: ${error}`); 
        return []; 
    }
}

export default allUser(); 
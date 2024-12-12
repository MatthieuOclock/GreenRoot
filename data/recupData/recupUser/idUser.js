import User from "../../models/user.js";

async function idUser(id) {
    try{ 
        const users = await User.findByPk(id); 
        users.forEach(user => { 
            //console.log("ok")
            //console.log(campain.dataValues); 
            return [user.dataValues]; 
        }); 

    } catch (error){ 
        console.log(`Error fetching user: ${error}`); 
        return []; 
    }
}

export default idUser(); 
import User from "../../models/user.js";

export default async function emailUser(email) {
    try{ 
        const user = await User.findOne({ where: { email } });
        if(user) { 
            return [user]; 
        } else { 
            return []; 
        }; 

    } catch (error){ 
        console.log(`Error fetching user: ${error}`); 
        return []; 
    }
}
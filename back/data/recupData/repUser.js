import User from "../models/user.js";

async function displayUsers() {
    try {
        const users = await User.findAll();
        users.forEach(user => {
            //console.log(user); 
            //console.log(user.dataValues.id); 
            return {"user":user};
        });
    } catch (error) {
        return `Error fetching users: ${error}`;
    }
}

export default displayUsers(); 
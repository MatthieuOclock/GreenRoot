import User from "../models/user.js";

async function displayUsers() {
    try {
        const users = await User.findAll();
        users.forEach(user => {
            return {'ID': user.id, 'first_name': user.first_name, 'Email': user.email};
        });
    } catch (error) {
        return `Error fetching users: ${error}`;
    }
}

export default displayUsers(); 
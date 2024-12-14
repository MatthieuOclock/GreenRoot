import User from "../../models/user.js"; 

export default async function addUser(first_name,last_Name,email,phone,role,password) {
    try{ 
        const user = User.create({ 
            first_name: first_name, 
            last_Name: last_Name, 
            email: email, 
            phone: phone, 
            role: role, 
            password: password
        }); 
        console.log("user create"); 
    } catch (error){ 
        console.error('Error creating user:', error);
    }
}; 

import React from "react";
import { Navigate} from "react-router-dom";

async function Member ({children}){ 
    const token = localStorage.getItem('token'); 
    const email = localStorage.getItem('email');

    if(token){ 
        try { 
            const response = await fetch("token",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({token})
            });

            response.ok ? children : <Navigate to={"/"} />

        } catch(error) { 
            console.log("Erreur programme test token:", error); 
        }; 
    } else { 
        return <Navigate to={"/"} />
    }
} 

export default Member; 
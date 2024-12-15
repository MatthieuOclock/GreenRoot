import React from "react";
import { Navigate} from "react-router-dom";

async function Member ({children}){ 
    const token = localStorage.getItem('token'); 

    if(token){ 
        try { 
            const response = await fetch("token",{
                method: 'GET',
                headers: {
                    'Authorization': token, 
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Erreur lors de l\'accès à la route protégée :', errorData.message);
                return <Navigate to={"/"} />
            }

            response.ok ? children : <Navigate to={"/"} />

        } catch(error) { 
            console.log("Erreur programme test token:", error); 
            return <Navigate to={"/"} />
        }; 
    } else { 
        return <Navigate to={"/"} />
    }
} 

export default Member; 
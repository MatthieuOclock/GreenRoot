import React from "react";
import { useEffect, useState } from "react"
import { Navigate} from "react-router-dom";

async function Member ({children}){ 
    const [verify,setVerify] = useState(null); 
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setVerify(false); 
                return;
            }

            try {
                const response = await fetch("/token", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.ok) {
                    setVerify(true);
                } else {
                    const errorData = await response.json();
                    console.log("Erreur lors de l'accès à la route protégée :", errorData.message);
                    setVerify(false);
                }
            } catch (error) {
                console.log("Erreur programme test token:", error);
                setVerify(false);
            }
        };

        verifyToken();
    }, [token]);

    if (verify === null) {
        return <div>Loading...</div>;
    }

    if (!verify) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default Member;
import { useNavigate } from "react-router-dom";

const deco = () => {
    localStorage.removeItem("token");
    alert("Déconnexion réussie !");
    useNavigate("/"); 
};

export default deco; 

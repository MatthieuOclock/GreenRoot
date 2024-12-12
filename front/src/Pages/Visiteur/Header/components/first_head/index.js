import Connexion from "./components/connexion";
import Inscription from "./components/inscription";

const first_head = () => { 
    return (
        <>  
            <div>
                <Connexion/>
                <p>ou</p>
                <Inscription/>
            </div>
        </>
    )
}; 

export default first_head; 
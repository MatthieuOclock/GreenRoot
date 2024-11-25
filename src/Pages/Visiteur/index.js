import React from "react"; 
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./Main/Home/page.js"; 

function Visiteur(){ 
    return(
        <div class="main">
            <Router>
                <Routes>
                    <Route path="*" element= {<Home />} />
                </Routes>
            </Router>
        </div>
    )
}; 

export default Visiteur; 
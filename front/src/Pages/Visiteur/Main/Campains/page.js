import { useState, useEffect } from 'react';
import CardCampain from './card';

function Campains() {
    const [campains, setCampains] = useState([]);

    const getCampains = async () => {
        try {
            const response = await fetch(`http://localhost:3000/campain`);
            const data = await response.json();
            setCampains(data);
            console.log(data);

        } catch (error) {
            console.error('Erreur de récupération des arbres:', error);
            alert('Erreur de récupération');
        }
    }

    useEffect(() => {
        getCampains();
    }, []);

    return (
        <>
            <div className='container' role="article">
                <h2 className='title-campain'>Liste des campagnes</h2>
                {campains.length > 0 ? (
                    <div className='card'>
                        {campains.map((campain, index) => (
                            <div> {console.log(campain.id)}
                                < CardCampain key={index} campainId={campain.id} name={campain.name} place={campain.place} date_begin={campain.date_begin} date_end={campain.date_end} picture={campain.picture} />
                            </div>))}
                    </div>
                ) : (
                    <p>Aucune campagne trouvé.</p>
                )}
            </div>
        </>
    );
}

export default Campains;
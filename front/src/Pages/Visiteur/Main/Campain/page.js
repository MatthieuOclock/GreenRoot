import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Campain() {
    const [campain, setCampain] = useState([]);

    let { campainId } = useParams();
    console.log(campainId);

    const getCampain = async () => {
        try {
            const response = await fetch(`http://localhost:1234/campain/${campainId}`);
            const data = await response.json();
            setCampain(data.data);
            console.log(data);

        } catch (error) {
            console.error('Erreur de récupération des arbres:', error);
            alert('Erreur de récupération');
        }
    };

    useEffect(() => {
        getCampain();
    }, []);

    return (
        <>
            <section className='card-container'>

                <div className='card-campains'>
                    <h3>{campain.name}</h3>
                    <img loading="lazy" src={`http://localhost:1234/${campain.picture}`} alt='image de campagne' />
                    <p className='card-campain-p'>{campain.place}</p>
                    <p className='card-campain-p'>Date de debut : {campain.date_begin} €</p>
                    <p className='card-campain-p'>Date de fin :{campain.date_end}</p>
                </div>
            </section>
        </>
    );
};

export default Campain;
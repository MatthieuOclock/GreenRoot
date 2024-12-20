const CardCampain = ({ campainId, name, place, date_begin, date_end, picture }) => {

    console.log(campainId);
    return (

        <div className="card-campains">
            <a className="repo" href={`/GreenRoot/campagne/${campainId}`} >

                <img loading="lazy" src={`http://localhost:1234/${picture}`} alt="picture" />

                <div className="campain-info">
                    <h3>{name}</h3>
                    <p>Lieu : {place}</p>
                    <p>Date de début : {date_begin}</p>
                    <p>Date de fin : {date_end}</p>
                </div>
            </a >

        </div>
    )
}

export default CardCampain;
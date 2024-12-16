
const CardTrees = ({ treeId, race, price, description, status, picture }) => {

    return (
        <div className="cardtree">
            <a target="_blank" className="repo" href={`/arbre/${treeId}`}>
                <img loading="lazy" src={`${process.env.URL_API}${picture}`} alt="picture" />
                <div className="campain-info">
                    <h2>{race}</h2>
                    <h3>{price}</h3>
                    <p>{description}</p>
                    <p>{status}</p>
                </div>
            </a>
        </div>
    )
}

export default CardTrees;
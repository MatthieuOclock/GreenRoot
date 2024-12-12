const ConfirmationCommand = () => {
    return (
        <>
            <div className="confirmationCommand-container">
                <h1 className="confirmationCommand-container">Merci pour votre achat</h1>
                <img loading="lazy" src={`/img/#`} alt='alt-image' className="confirmationCommand-image" />
                <p>Votre commande devrait arriver lundi</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Voir les détail de la commande</a>
                <p>Continuer les achats</p>

                <div className="ConfirmationCommand-carrousel">
                    <p>Carrousel d'images d'arbres à acheter</p>
                </div>

            </div >
        </>
    )
}

export default ConfirmationCommand;
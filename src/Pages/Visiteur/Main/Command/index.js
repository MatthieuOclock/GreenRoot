const Command = () => {

    return (
        <>
            <div className="command-container">
                <h1>passer votre commande pseudo</h1>
                <hr></hr>
                <p>image de la commande</p>
                <p>description de la commande</p>
                <hr></hr>

                <ul>
                    <li>
                        <p>article nombre</p>
                        <p>tax nombre</p>
                        <p>total nombre</p>
                    </li>
                    <hr></hr>
                    <li>
                        <p>adress</p>
                        <p>pseudo</p>
                    </li>
                    <hr></hr>
                    <li>
                        <h2>methode de paiement</h2>
                        <p>solde</p>
                        <p>130e</p>
                    </li>
                </ul>
                <button>passer votre commande</button>

            </div >
        </>
    )
}

export default Command;
import React, { useState, useEffect } from 'react';

const Login = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassWord] = useState(""); 

    const onSubmit = (event) => { 
        const {name ,value} = event.target; 

        switch(name) {
            case "email" : 
                setEmail(value); 
                break; 
            case "password" : 
                setPassWord(value); 
                break; 
        }; 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1234/testlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email,password})
            });

            if (response.ok) {
                const data = await response.json();
                alert('Connexion réussie!');
                localStorage.setItem('token', data.token);
                window.location.href = '/'; // Redirection après la connexion
            } else {
                const errorData = await response.json();
                alert(`Erreur: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            alert('Erreur lors de la connexion. Veuillez réessayer plus tard.');
        }
    };

    return (
        <>
            <div className='form-container'>
                <form role='form' className="form" method="post" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            placeholder="Votre E-mail"
                            title="Entrez votre email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onSubmit}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Votre mot de passe"
                            title="Entrez votre password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onSubmit}
                            required
                        />
                    </div>

                    <button type="submit">Se connecter</button>
                </form>

                <a href="#">Mot de passe oublié</a>
                <a href="/inscription">Créer mon compte</a>
            </div>
        </>
    );
}

export default Login;
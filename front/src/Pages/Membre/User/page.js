import React, { useState, useEffect } from 'react';
import Card from './card/index.js';
import CardTrees from '../../Visiteur/Main/Trees/card/index.js';

function User() {
    const [user, setUser] = useState({
        last_name: '',
        first_name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [trees, setTrees] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState({
        last_name: false,
        first_name: false,
        email: false,
        phone: false,
        password: false
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                const userResponse = await fetch(`http://localhost:1234/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (userResponse.status === 401) {
                    throw new Error('Unauthorized');
                }
                const userData = await userResponse.json();
                setUser(userData);

                const treesResponse = await fetch(`${process.env.URL_API}user/me/trees`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (treesResponse.status === 401) {
                    throw new Error('Unauthorized');
                }
                const treesData = await treesResponse.json();
                setTrees(treesData);
                const ordersResponse = await fetch(`${process.env.URL_API}order/me/trees`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (ordersResponse.status === 401) {
                    throw new Error('Unauthorized');
                }
                const ordersData = await ordersResponse.json();
                setOrders(ordersData);
            } catch (error) {
                console.error('Erreur de récupération des données:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleEditClick = (field) => {
        setIsEditing({
            ...isEditing,
            [field]: !isEditing[field]
        });
    };

    const handleUpdate = async (e, field) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = user.id;
            const response = await fetch(`${process.env.URL_API}user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ [field]: user[field] })
            });

            if (response.ok) {
                setIsEditing({
                    ...isEditing,
                    [field]: false
                });
            } else {
                console.error(`Erreur lors de la mise à jour de ${field}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de ${field}:`, error);
        }
    };

    return (
        <>
            <section>
                <form>
                    <div className='profilForm'>
                        <label htmlFor="last_name">Nom</label>
                        {isEditing.last_name ? (
                            <>
                                <input type="text" id='last_name' name='last_name' value={user.last_name} onChange={handleInputChange} />
                                <button type='button' onClick={(e) => handleUpdate(e, 'last_name')}>Enregistrer</button>
                            </>
                        ) : (
                            <>
                                <p>{user.last_name}</p>
                                <button type='button' onClick={() => handleEditClick('last_name')}>Modifier</button>
                            </>
                        )}
                    </div>
                    <div className='profilForm'>
                        <label htmlFor="first_name">Prénom</label>
                        {isEditing.first_name ? (
                            <>
                                <input type="text" id='first_name' name='first_name' value={user.first_name} onChange={handleInputChange} />
                                <button type='button' onClick={(e) => handleUpdate(e, 'first_name')}>Enregistrer</button>
                            </>
                        ) : (
                            <>
                                <p>{user.first_name}</p>
                                <button type='button' onClick={() => handleEditClick('first_name')}>Modifier</button>
                            </>
                        )}
                    </div>
                    <div className='profilForm'>
                        <label htmlFor="email">Email</label>
                        {isEditing.email ? (
                            <>
                                <input type="email" id='email' name='email' value={user.email} onChange={handleInputChange} />
                                <button type='button' onClick={(e) => handleUpdate(e, 'email')}>Enregistrer</button>
                            </>
                        ) : (
                            <>
                                <p>{user.email}</p>
                                <button type='button' onClick={() => handleEditClick('email')}>Modifier</button>
                            </>
                        )}
                    </div>
                    <div className='profilForm'>
                        <label htmlFor="phone">Téléphone</label>
                        {isEditing.phone ? (
                            <>
                                <input type="number" id='phone' name='phone' value={user.phone} onChange={handleInputChange} />
                                <button type='button' onClick={(e) => handleUpdate(e, 'phone')}>Enregistrer</button>
                            </>
                        ) : (
                            <>
                                <p>{user.phone}</p>
                                <button type='button' onClick={() => handleEditClick('phone')}>Modifier</button>
                            </>
                        )}
                    </div>
                    <div className='profilForm'>
                        <label htmlFor="password">Mot de passe</label>
                        {isEditing.password ? (
                            <>
                                <input type="password" id='password' name='password' value={user.password} onChange={handleInputChange} />
                                <button type='button' onClick={(e) => handleUpdate(e, 'password')}>Enregistrer</button>
                            </>
                        ) : (
                            <>
                                <p>{'•'.repeat(8)}</p> {/* masque le mot de passe */}
                                <button type='button' onClick={() => handleEditClick('password')}>Modifier</button>
                            </>
                        )}
                    </div>
                </form>
            </section>
            <section>
                <h1>Détails des arbres achetés</h1>
                <div className='container'>

                    {trees.length > 0 ? (
                        <ul className='card-trees'>
                            {trees.map((tree) => (
                                <Card key={tree.id} plantation_date={tree.plantation_date} order_date={tree.order_date} total={tree.total} status={tree.status} />
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun arbre trouvé.</p>
                    )}
                </div>
            </section>
            <section>
                <h2>Mes Arbres</h2>
                <div className='container'>
                    {orders.length > 0 ? (
                        <ul className='card-trees'>
                            {orders.map((tree, index) => (
                                <CardTrees key={index} treeId={tree.id} race={tree.race} price={tree.price} description={tree.description} status={tree.status} picture={tree.picture} />
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun arbre trouvé.</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default User;

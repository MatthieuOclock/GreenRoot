import React, { useState, useEffect } from 'react';

const Partenaire = () => {
    const [trees, setTrees] = useState([]);
    const [editingTree, setEditingTree] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [formValues, setFormValues] = useState({
        race: '',
        price: '',
        description: '',
        picture: '',
        status: ''
    });

    const getToken = () => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        const fetchTrees = async () => {
            try {
                const response = await fetch(`${process.env.URL_API}tree`);
                const data = await response.json();
                setTrees(data);
            } catch (error) {
                console.error('Erreur de récupération des arbres:', error);
            }
        };

        fetchTrees();
    }, []);

    const handleEditClick = (tree) => {
        setEditingTree(tree.id);
        setFormValues({
            race: tree.race,
            price: tree.price,
            description: tree.description,
            picture: tree.picture,
            status: tree.status
        });
        setIsAddingNew(false);
    };

    const handleAddClick = () => {
        setIsAddingNew(true);
        setEditingTree(null);
        setFormValues({
            race: '',
            price: '',
            description: '',
            picture: '',
            status: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isAddingNew ? 'POST' : 'PUT';
            const url = isAddingNew ? `${process.env.URL_API}tree` : `${process.env.URL_API}tree/${editingTree}`;
            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            if (response.ok) {
                const updatedTree = await response.json();
                if (isAddingNew) {
                    setTrees([...trees, updatedTree]);
                    setIsAddingNew(false);
                } else {
                    setTrees(trees.map(tree => tree.id === editingTree ? updatedTree : tree));
                    setEditingTree(null);
                }
                setFormValues({
                    race: '',
                    price: '',
                    description: '',
                    picture: '',
                    status: ''
                });
            } else {
                console.error('Erreur lors de la mise à jour de l\'arbre:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'arbre:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cet arbre ?')) {
            try {
                const response = await fetch(`${process.env.URL_API}tree/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    setTrees(trees.filter(tree => tree.id !== id));
                } else {
                    console.error('Erreur lors de la suppression de l\'arbre:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'arbre:', error);
            }
        }
    };

    return (
        <div>
            <h2>Arbres</h2>
            <ul>
                {trees.map(tree => (
                    <li key={tree.id}>
                        {tree.race} - {tree.price}€
                        <button onClick={() => handleEditClick(tree)}>Modifier</button>
                        <button onClick={() => handleDeleteClick(tree.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddClick}>Ajouter un nouvel arbre</button>

            {(editingTree || isAddingNew) && (
                <form onSubmit={handleFormSubmit}>
                    <h3>{isAddingNew ? 'Ajouter un nouvel arbre' : 'Modifier l\'arbre'}</h3>
                    <label>
                        Race:
                        <input
                            type="text"
                            name="race"
                            value={formValues.race}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Prix:
                        <input
                            type="number"
                            name="price"
                            value={formValues.price}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Image:
                        <input
                            type="file"
                            name="picture"
                            accept="image/png, image/jpeg"
                            value={formValues.picture}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Statut:
                        <input
                            type="text"
                            name="status"
                            value={formValues.status}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">{isAddingNew ? 'Ajouter' : 'Enregistrer les modifications'}</button>
                </form>
            )}
        </div>
    );
};

export default Partenaire;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChefDeProjet from "../ChefDeProjet/page";
import Partenaire from "../Partenaire/page";

const Administrateur = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formValues, setFormValues] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.URL_API}user`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast.error("Erreur de récupération des utilisateurs");
        console.error("Erreur de récupération des utilisateurs:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormValues({
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: "",
    });
    setIsAddingNew(false);
  };

  const handleAddClick = () => {
    setIsAddingNew(true);
    setEditingUser(null);
    setFormValues({
      last_name: "",
      first_name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const confirmMessage = editingUser
      ? "Voulez-vous vraiment modifier cet utilisateur ?"
      : "Voulez-vous vraiment ajouter cet utilisateur ?";
    if (window.confirm(confirmMessage)) {
      try {
        const token = localStorage.getItem("token");
        const method = editingUser ? "PUT" : "POST";
        const url = editingUser
          ? `${process.env.URL_API}user/${editingUser}`
          : `${process.env.URL_API}user`;
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          if (editingUser) {
            setUsers(
              users.map((user) =>
                user.id === editingUser ? updatedUser : user
              )
            );
            toast.success("Utilisateur modifié avec succès");
          } else {
            setUsers([...users, updatedUser]);
            toast.success("Utilisateur ajouté avec succès");
          }
          setEditingUser(null);
          setIsAddingNew(false);
          setFormValues({
            last_name: "",
            first_name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
          });
        } else {
          toast.error("Erreur lors de la mise à jour de l'utilisateur");
          console.error(
            "Erreur lors de la mise à jour de l'utilisateur:",
            response.statusText
          );
        }
      } catch (error) {
        toast.error("Erreur lors de la mise à jour de l'utilisateur");
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      }
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.URL_API}user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("Utilisateur supprimé avec succès");
        } else {
          toast.error("Erreur lors de la suppression de l'utilisateur");
          console.error(
            "Erreur lors de la suppression de l'utilisateur:",
            response.statusText
          );
        }
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'utilisateur");
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  return (
    <div>
      <h2>Utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} - {user.email}
            <button onClick={() => handleEditClick(user)}>Modifier</button>
            <button onClick={() => handleDeleteClick(user.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddClick}>Ajouter un nouvel utilisateur</button>

      {(editingUser || isAddingNew) && (
        <form onSubmit={handleFormSubmit}>
          <h3>
            {editingUser
              ? "Modifier l'utilisateur"
              : "Ajouter un nouvel utilisateur"}
          </h3>
          <label>
            Nom:
            <input
              type="text"
              name="last_name"
              value={formValues.last_name}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Prénom:
            <input
              type="text"
              name="first_name"
              value={formValues.first_name}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Téléphone:
            <input
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Rôle:
            <input
              type="text"
              name="role"
              value={formValues.role}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Mot de passe:
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              required={!editingUser}
            />
          </label>
          <br />
          <button type="submit">
            {editingUser ? "Enregistrer les modifications" : "Ajouter"}
          </button>
        </form>
      )}
      <ChefDeProjet />
      <Partenaire />
    </div>
  );
};

export default Administrateur;

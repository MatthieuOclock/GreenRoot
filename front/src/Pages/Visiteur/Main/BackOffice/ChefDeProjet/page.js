import React, { useState, useEffect } from "react";
import Partenaire from "../Partenaire/page.js";

const ChefDeProjet = () => {
  const [campains, setCampains] = useState([]);
  const [editingCampain, setEditingCampain] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    place: "",
    date_begin: "",
    date_end: "",
    picture: "",
  });

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchCampains = async () => {
      try {
        const response = await fetch(`${process.env.URL_API}campain`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await response.json();
        setCampains(data);
      } catch (error) {
        console.error("Erreur de récupération des campagnes:", error);
      }
    };

    fetchCampains();
  }, []);

  const handleEditClick = (campain) => {
    setEditingCampain(campain.id);
    setFormValues({
      name: campain.name,
      place: campain.place,
      date_begin: campain.date_begin,
      date_end: campain.date_end,
      picture: campain.picture,
    });
    setIsAddingNew(false);
  };

  const handleAddClick = () => {
    setIsAddingNew(true);
    setEditingCampain(null);
    setFormValues({
      name: "",
      place: "",
      date_begin: "",
      date_end: "",
      picture: "",
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
    try {
      const method = isAddingNew ? "POST" : "PUT";
      const url = isAddingNew
        ? `${process.env.URL_API}campain`
        : `${process.env.URL_API}campain / ${editingCampain}`;
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const updatedCampain = await response.json();
        if (isAddingNew) {
          setCampains([...campains, updatedCampain]);
          setIsAddingNew(false);
        } else {
          setCampains(
            campains.map((campain) =>
              campain.id === editingCampain ? updatedCampain : campain
            )
          );
          setEditingCampain(null);
        }
        setFormValues({
          name: "",
          place: "",
          date_begin: "",
          date_end: "",
          picture: "",
        });
      } else {
        console.error("Erreur lors de la mise à jour de la campagne:");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la campagne:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette campagne ?")) {
      try {
        const response = await fetch(`${process.env.URL_API}campain / ${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setCampains(campains.filter((campain) => campain.id !== id));
        } else {
          console.error(
            "Erreur lors de la suppression de la campagne:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la campagne:", error);
      }
    }
  };

  return (
    <div>
      <h2>Campagnes</h2>
      <ul>
        {campains.map((campain) => (
          <li key={campain.id}>
            {campain.name} - {campain.place}
            <button onClick={() => handleEditClick(campain)}>Modifier</button>
            <button onClick={() => handleDeleteClick(campain.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddClick}>Ajouter une nouvelle campagne</button>

      {(editingCampain || isAddingNew) && (
        <form onSubmit={handleFormSubmit}>
          <h3>
            {isAddingNew
              ? "Ajouter une nouvelle campagne"
              : "Modifier la campagne"}
          </h3>
          <label>
            Nom:
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Lieu:
            <input
              type="text"
              name="place"
              value={formValues.place}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Date de début:
            <input
              type="date"
              name="date_begin"
              value={formValues.date_begin}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Date de fin:
            <input
              type="date"
              name="date_end"
              value={formValues.date_end}
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
          <button type="submit">
            {isAddingNew ? "Ajouter" : "Enregistrer les modifications"}
          </button>
        </form>
      )}
      <Partenaire />
    </div>
  );
};

export default ChefDeProjet;

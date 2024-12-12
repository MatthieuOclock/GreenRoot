const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <h1>Contact</h1>
        <form method="post" className="contact-form">
          <div className="form-group">
            <label htmlFor="contactReason">Motif de contact:</label>
            <select id="contactReason" name="contactReason" required>
              <option value="" disabled>
                Sélectionner un motif
              </option>
              <option value="partenaire">Je souhaite être partenaire</option>
              <option value="chefDeProjet">
                Je souhaite être chef de projet
              </option>
              <option value="probleme_connexion">
                J'ai un problème pour me connecter
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nom:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required />
          </div>
          <button className="submit-button">Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default Contact;

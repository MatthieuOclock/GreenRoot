import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../../../../CardContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(
  "pk_test_51PM77gHRY0RGHhfcc3yltn0UQxor4nbXVuwIU2OBjzRA3TkSUx5G3ioywHLbK1qZasZoyatbz9wc35NghOalG7Rk00Y7jlQmhi"
);

const Payment = () => {
  const { panier } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const totalAmount = panier.reduce(
    (total, tree) => total + tree.price * tree.quantity,
    0
  );

  useEffect(() => {
    fetch(`${process.env.URL_API}create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalAmount * 100 }), // montant en centimes
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <Elements stripe={stripePromise}>
      <h1>
        Paiement: <span>{totalAmount}</span>
      </h1>
      <div className="payment-container">
        <div className="produits">
          <h2>Détails d'expédition et de facturation</h2>
          <form method="POST" action="#" className="form">
            <label htmlFor="name">Nom:</label>
            <input type="text" name="name" />

            <label htmlFor="address">Adresse:</label>
            <input type="text" name="address" />

            <label htmlFor="country">Pays:</label>
            <select name="country" id="country-select">
              <option value="">--Veuillez choisir un pays--</option>
              <option value="France">France</option>
              <option value="Sarcelles">Sarcelles</option>
              <option value="Paris">Paris</option>
            </select>

            <label htmlFor="city">Ville:</label>
            <input type="text" name="city" />

            <label htmlFor="zip">Code postal:</label>
            <input type="text" name="zip" />

            <label htmlFor="payment-method">Mode de paiement:</label>
            <select
              name="payment-method"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="card">Carte bancaire</option>
              <option value="cheque">Chèque</option>
              <option value="bank-transfer">Virement bancaire</option>
            </select>
          </form>
          {selectedPaymentMethod === "card" && (
            <StripePaymentForm clientSecret={clientSecret} panier={panier} />
          )}
          {selectedPaymentMethod === "cheque" && <ChequePaymentInfo />}
          {selectedPaymentMethod === "bank-transfer" && (
            <BankTransferPaymentInfo />
          )}
        </div>
      </div>
    </Elements>
  );
};

const StripePaymentForm = ({ clientSecret, panier }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Kassim qui khalass",
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Paiement réussi!");
        await addOrderToDatabase(panier);
      }
    }
  };

  const addOrderToDatabase = async (panier) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Token non trouvé, veuillez vous reconnecter.");
        return;
      }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

      const totalAmount = parseFloat(
        panier
          .reduce(
            (total, tree) => total + parseFloat(tree.price) * tree.quantity,
            0
          )
          .toFixed(2)
      );

      const response = await fetch(`${process.env.URL_API}order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_date: new Date().toISOString(),
          status: "en cours",
          total: totalAmount,
          plantation_date: new Date().toISOString(),
          tree_id: panier.map((tree) => tree.treeId).join(","),
          user_id: userId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Commande ajoutée avec succès!");
      } else {
        toast.error("Erreur lors de l'ajout de la commande: " + data.message);
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la commande: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Procédez au paiement
      </button>
    </form>
  );
};

const ChequePaymentInfo = () => (
  <div>
    <h3>Paiement par Chèque</h3>
    <p>Veuillez envoyer votre chèque à l'adresse suivante :</p>
    <p>113 rue Camille Groult, 95123 Sarcelles, France</p>
    <p>À l'ordre de: GreenRoots</p>
  </div>
);

const BankTransferPaymentInfo = () => (
  <div>
    <h3>Paiement par Virement Bancaire</h3>
    <p>Veuillez effectuer un virement bancaire aux coordonnées suivantes :</p>
    <p>IBAN: FR76 1234 5678 9101 1121 3141 516</p>
    <p>BIC: ABCDEF12</p>
    <p>Nom du bénéficiaire: GREENROOTS</p>
  </div>
);

export default Payment;

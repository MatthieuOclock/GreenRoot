const Card = ({ order_date, plantation_date, total, status }) => {
  return (
    <div className="campain-info">
      <h2>{order_date}</h2>
      <h3>{plantation_date}</h3>
      <p>{total}</p>
      <p>{status}</p>
    </div>
  );
};

export default Card;

import React from "react";

const deals = [

  {
    id: 3,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    title: "Men’s Jackets & Jeans",
    offer: "From ₹799",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400",
    title: "Footwear Fiesta",
    offer: "Min 40% Off",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
    title: "Handbags & Watches",
    offer: "Up to 50% Off",
  },
];

const DealsBar = () => {
  return (
    <div style={styles.container}>
      {deals.map((deal) => (
        <div key={deal.id} style={styles.card}>
          <img src={deal.img} alt={deal.title} style={styles.img} />
          <div style={styles.textBox}>
            <h4 style={styles.title}>{deal.title}</h4>
            <p style={styles.offer}>{deal.offer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    padding: "1rem 2rem",
    background: "#fafafa",
    borderBottom: "1px solid #eee",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  },
  textBox: {
    padding: "0.5rem 0.8rem",
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "0",
    color: "#333",
  },
  offer: {
    fontSize: "13px",
    color: "#d9534f",
    margin: "4px 0 0 0",
  },
};

export default DealsBar;

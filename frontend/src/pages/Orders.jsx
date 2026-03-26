import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("email") || "guest";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/user/${userEmail}`
        );
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [userEmail]);

  if (orders.length === 0)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No orders found.</p>;

  return (
    <div style={container}>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={orderCard}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <div style={productsContainer}>
            {order.products.map((p, idx) => (
              <div key={idx} style={productItem}>
                <img
                  src={p.image || "https://via.placeholder.com/80"}
                  alt={p.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                />
                <div>
                  <p>{p.name}</p>
                  <p>₹{p.price} x {p.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Styles
const container = {
  padding: "2rem",
};

const orderCard = {
  padding: "1rem",
  marginBottom: "1.5rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const productsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginTop: "0.5rem",
};

const productItem = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
};

export default Orders;

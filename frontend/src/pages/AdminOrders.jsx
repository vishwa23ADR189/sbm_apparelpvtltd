import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const exportToCSV = (orders) => {
  const header = ["Name", "Email", "Phone", "Address", "Timestamp", "Item Name", "Price"];
  let rows = [];

  orders.forEach(order => {
    order.items.forEach(item => {
      rows.push([
        order.user.name,
        order.user.email,
        order.user.phone,
        order.user.address.replace(/\n/g, ' '),
        order.timestamp,
        item.name,
        item.price
      ]);
    });
  });

  const csvContent = [header, ...rows]
    .map(row => row.map(val => `"${val}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `VanithaTextiles_Orders_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (!admin) navigate("/login");
  }, [admin, navigate]);

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // or 'oldest'
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    let result = [...orders];

    // Filter by search
    if (search.trim() !== '') {
      result = result.filter(order =>
        order.user.name.toLowerCase().includes(search.toLowerCase()) ||
        order.user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by timestamp
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(result);
  }, [search, sortOrder, orders]);

  const handleDeleteOrder = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updated = [...orders];
      updated.splice(index, 1);
      setOrders(updated);
      localStorage.setItem("adminOrders", JSON.stringify(updated));
    }
  };
   
  const handleClearAll = () => {
    if (window.confirm("⚠️ Are you sure you want to clear ALL orders?")) {
      setOrders([]);
      localStorage.removeItem("adminOrders");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧾 All User Orders</h2>

      {orders.length > 0 && (
        <>
          <div style={toolbar}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchStyle}
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={sortStyle}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
            
            <button onClick={handleClearAll} style={clearBtn}>🚨 Clear All Orders</button>
            <button onClick={() => exportToCSV(orders)} style={csvBtn}>
  📥 Download CSV
</button>

          </div>
        </>
      )}

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        filteredOrders.map((order, index) => (
          <div key={index} style={cardStyle}>
            <h4>🧑 Name: {order.user.name}</h4>
            <p>📧 Email: {order.user.email}</p>
            <p>📞 Phone: {order.user.phone}</p>
            <p>🏠 Address: {order.user.address}</p>
            <p>🕒 Ordered On: {order.timestamp}</p>
            <h4>🛒 Items:</h4>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>{item.name} - ₹{item.price}</li>
              ))}
            </ul>
            <h4>💰 Total: ₹{order.total}</h4>
            <button onClick={() => handleDeleteOrder(index)} style={deleteBtn}>Delete Order ❌</button>
          </div>
        ))
      )}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '1rem',
  marginBottom: '1.5rem',
  backgroundColor: '#f9f9f9'
};

const csvBtn = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};


const deleteBtn = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '0.5rem'
};

const clearBtn = {
  backgroundColor: '#ff0000',
  color: '#fff',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const toolbar = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1rem',
  alignItems: 'center'
};

const searchStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  flex: '1'
};

const sortStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};



export default AdminOrders;

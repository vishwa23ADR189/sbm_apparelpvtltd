import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status === "ok") {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setMsg("Login successful!");
        navigate("/admin/dashboard");
      } else {
        setMsg(data.message);
      }
    } catch (err) {
      setMsg("Error during login.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Admin Login</h2>
        <input
          style={styles.input}
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f6"
  },
  card: {
    background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "300px"
  },
  input: {
    width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px"
  },
  button: {
    width: "100%", padding: "12px", backgroundColor: "#282c3f", color: "#fff", border: "none", borderRadius: "4px"
  }
};

export default AdminLogin;

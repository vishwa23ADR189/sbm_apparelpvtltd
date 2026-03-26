import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Products</h2>
      <Link to="/admin/add" className="btn">Add New Product</Link>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><img src={product.image} alt="" width="50"/></td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/admin/edit/${product._id}`} className="btn">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="btn red">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

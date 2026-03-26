import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    images: [],
    stock: '',
    sizes: ['M', 'L', 'XL'], // Default sizes
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.sizes.length === 0) {
      setError('Please select at least one size');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          description: formData.description,
          image: formData.image,
          images: formData.images.filter((img) => img.trim()),
          stock: parseInt(formData.stock) || 0,
          sizes: formData.sizes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      alert('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        images: [],
        stock: '',
        sizes: ['M', 'L', 'XL'],
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Error adding product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="auth__card" style={{ maxWidth: '700px' }}>
        <h1 className="auth__title">Add New Product</h1>
        <p className="auth__subtitle">Enter product details to add it to your inventory</p>

        {error && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '8px',
            fontSize: '0.95rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
          </div>

          {/* Stock */}
          <div className="form-group">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="sarees">Sarees</option>
              <option value="chudidar">Chudidar</option>
              <option value="frocks">Frocks</option>
              <option value="kurta">Kurta</option>
              <option value="lehanga">Lehanga</option>
              <option value="shirts">Shirts</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                border: '1px solid rgba(58, 42, 34, 0.15)',
                background: 'rgba(245, 241, 237, 0.88)',
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: 'var(--brand-dark)',
                resize: 'vertical',
                minHeight: '100px',
              }}
            />
          </div>

          {/* Main Image */}
          <div className="form-group">
            <label htmlFor="image">Primary Image URL *</label>
            <input
              id="image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div style={{ marginTop: '0.5rem' }}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    maxWidth: '150px',
                    maxHeight: '150px',
                    borderRadius: '8px',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1520975927760-8a17f74779f4?auto=format&fit=crop&w=200&q=80';
                  }}
                />
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div className="form-group">
            <label>Additional Images</label>
            {formData.images.map((img, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(e, index)}
                  placeholder={`Image URL ${index + 1}`}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="btn btn--outline"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="btn btn--outline"
              style={{ marginTop: '0.5rem' }}
            >
              Add Image
            </button>
          </div>

          {/* Sizes */}
          <div className="form-group">
            <label>Available Sizes *</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}>
              {AVAILABLE_SIZES.map((size) => (
                <label
                  key={size}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: formData.sizes.includes(size)
                      ? '2px solid var(--brand-dark)'
                      : '1px solid rgba(58, 42, 34, 0.15)',
                    backgroundColor: formData.sizes.includes(size)
                      ? 'rgba(58, 42, 34, 0.08)'
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.sizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              className="form__submit"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => navigate('/admin/dashboard')}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;

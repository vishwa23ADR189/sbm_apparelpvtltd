import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem('admin'));

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((item) => item.category).filter(Boolean)));
    return ['all', ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .slice(0, 48);
  }, [products, selectedCategory, search]);

  return (
    <main className="products">
      <div className="products__header">
        <div>
          <h1 className="products__title">Shop the Collection</h1>
          <p className="products__subtitle">
            Browse through our curated selection of premium pieces. Refine your search
            using filters, or explore the latest arrivals.
          </p>
        </div>

        <div className="products__controls">
          <div className="form-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              className="form-input"
              type="search"
              value={search}
              placeholder="Search by item or style"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <button
              className="btn btn--solid products__add-button"
              onClick={() => navigate('/admin/add')}
            >
              Add New Product
            </button>
          )}
        </div>
      </div>

      <div className="products__grid">
        {loading && <p className="text-center">Loading products</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-center">No products match your search.</p>
        )}

        {filtered.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Products;

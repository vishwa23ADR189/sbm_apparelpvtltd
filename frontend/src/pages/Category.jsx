import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        setError('Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const matching = useMemo(() => {
    if (!categoryName) return products;
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName.toLowerCase()
    );
  }, [products, categoryName]);

  return (
    <main className="products">
      <div className="products__header">
        <div>
          <h1 className="products__title">{categoryName}</h1>
          <p className="products__subtitle">
            Discover our curated selection of {categoryName} pieces. Scroll through
            the collection and tap any item for details.
          </p>
        </div>
      </div>

      <div className="products__grid">
        {loading && <p className="text-center">Loading...</p>}
        {!loading && !matching.length && (
          <p className="text-center">No products found for this category.</p>
        )}

        {matching.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {error && <p className="text-center">{error}</p>}
    </main>
  );
};

export default Category;

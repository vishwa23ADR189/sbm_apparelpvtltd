import { Link } from 'react-router-dom';

const CategorySection = ({ categories }) => {
  return (
    <section className="category-section">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link 
            to={`/category/${category.slug}`} 
            key={category.slug} 
            className="category-card"
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
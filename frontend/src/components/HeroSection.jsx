import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const images = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
  "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg",
  "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg",
  "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg"
];


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      className="hero"
      style={{
        position: "relative",
        height: "80vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Carousel Images */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Fashion ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 3s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div
        style={{
          position: "relative",
          color: "#fff",
          textAlign: "center",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "60px 40px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          Traditional Elegance, Modern Style
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Discover our exquisite collection of handcrafted textiles
        </p>
        <Link
          to="/products"
          style={{
            backgroundColor: "#ff3e6c",
            color: "#fff",
            padding: "25px 25px",
            borderRadius: "5px",
            fontSize: "1rem",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e63956")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff3e6c")}
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

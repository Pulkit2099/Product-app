import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedProducts = ({ token }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Make a GET request to your backend API endpoint for featured products
        const response = await axios.get('http://localhost:3000/products/featured', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the state with the fetched featured products
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error.message);
      }
    };

    // Call the fetchFeaturedProducts function
    fetchFeaturedProducts();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Featured Products</h2>
      <ul style={styles.list}>
        {featuredProducts.map((product) => (
          <li key={product._id} style={styles.item}>
            <strong style={styles.productName}>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#4CAF50',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#fff',
  },
  heading: {
    marginBottom: '10px',
    fontSize: '28px',
    textDecoration: 'underline',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    marginBottom: '15px',
    fontSize: '18px',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  productName: {
    color: '#4CAF50',
  },
};

export default FeaturedProducts;

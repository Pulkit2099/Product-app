import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsFilter = ({ token }) => {
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilter = async () => {
    try {
      // Fetch products with price less than a certain value
      const responsePrice = await axios.get(`https://product-so46.onrender.com/products/price/${maxPrice}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Fetch products with rating higher than a certain value
      const responseRating = await axios.get(`https://product-so46.onrender.com/products/rating/${minRating}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Combine the results and remove duplicates (if any)
      const combinedProducts = Array.from(new Set([...responsePrice.data, ...responseRating.data]));

      // Update the state with the fetched filtered products
      setFilteredProducts(combinedProducts);
    } catch (error) {
      console.error('Error fetching filtered products:', error.message);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [token, maxPrice, minRating]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f2f2f2' }}>
      <h2 style={{ color: '#333' }}>Filter Products</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px', color: '#555' }}>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <label style={{ marginRight: '10px', color: '#555' }}>
          Min Rating:
          <input
            type="number"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button
          onClick={handleFilter}
          style={{
            padding: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Filter
        </button>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li
            key={product._id}
            style={{
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong style={{ color: '#333' }}>{product.name}</strong> - ${product.price} - Rating: {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsFilter;

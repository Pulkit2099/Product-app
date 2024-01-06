import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeaturedProducts from './FeaturedProducts';

const AddProductForm = ({ token }) => {
  const [formData, setFormData] = useState({
    productID: '',
    name: '',
    price: '',
    featured: false,
    rating: '',
    company: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/products/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        productID: '',
        name: '',
        price: '',
        featured: false,
        rating: '',
        company: '',
      });
      toast.success('Product added successfully!', {
        position: 'top-right',
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });


      // Optionally, you can add logic to redirect or show a success message
    } catch (error) {
      console.error('Error adding product:', error.message);
      // Handle error, show error message, etc.
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    nav: {
      backgroundColor: '#333',
      padding: '15px 0',
      marginBottom: '20px',
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-around',
    },
    navItem: {
      marginRight: '20px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      padding: '8px 16px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '10px',
    },
    input: {
      padding: '8px',
      marginBottom: '10px',
    },
    checkbox: {
      marginRight: '5px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <>
    {/* <FeaturedProducts token ={token}/> */}
    <div style={styles.container}>
   

      <h2>Add Product</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Product ID:
          <input type="text" name="productID" value={formData.productID} onChange={handleInputChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Featured:
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} style={styles.checkbox} />
        </label>

        <label style={styles.label}>
          Rating:
          <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} style={styles.input} step="0.1" />
        </label>

        <label style={styles.label}>
          Company:
          <input type="text" name="company" value={formData.company} onChange={handleInputChange} style={styles.input} required />
        </label>

        <button type="submit" style={styles.button}>Add Product</button>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default AddProductForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://product-so46.onrender.com/products/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [token]);

  const handleUpdate = (productId) => {
    const productToUpdate = products.find((product) => product._id === productId);
    setSelectedProduct(productToUpdate);
    setShowUpdateModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://product-so46.onrender.com/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  
      // Show toast notification
      toast.success('Product deleted successfully!', {
        position: 'top-right',
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error deleting product:', error.message);
      // Handle error, show error message, etc.
    }
  };

  const handleUpdateSubmit = async (updatedProductData) => {
    try {
      await axios.put(`https://product-so46.onrender.com/products/update/${selectedProduct._id}`, updatedProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowUpdateModal(false);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProduct._id ? { ...product, ...updatedProductData } : product
        )
      );
      toast.success('Product updated successfully!', {
        position: 'top-right',
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    productList: {
      listStyleType: 'none',
      padding: '0',
    },
    productItem: {
      marginBottom: '10px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    updateModal: {
      backgroundColor: '#fff',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginTop: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    updateButton: {
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    updateSubmitButton: {
      backgroundColor: '#2196f3',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Product List</h2>
      <ul style={styles.productList}>
        {products.map((product) => (
          <li key={product._id} style={styles.productItem}>
            <strong>{product.name}</strong> - ${product.price}
            <button style={styles.updateButton} onClick={() => handleUpdate(product._id)}>
              Update
            </button>
            <button style={styles.deleteButton} onClick={() => handleDelete(product._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showUpdateModal && (
        <div style={styles.updateModal}>
          <h2>Update Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedProductData = {
                name: e.target.name.value,
                price: e.target.price.value,
                featured: e.target.featured.checked,
                rating: e.target.rating.value,
                company: e.target.company.value,
              };
              handleUpdateSubmit(updatedProductData);
            }}
          >
            <label>
              Name:
              <input type="text" name="name" defaultValue={selectedProduct.name} required />
            </label>
            <br />

            <label>
              Price:
              <input type="number" name="price" defaultValue={selectedProduct.price} required />
            </label>
            <br />

            <label>
              Featured:
              <input type="checkbox" name="featured" defaultChecked={selectedProduct.featured} />
            </label>
            <br />

            <label>
              Rating:
              <input type="number" name="rating" defaultValue={selectedProduct.rating} step="0.1" />
            </label>
            <br />

            <label>
              Company:
              <input type="text" name="company" defaultValue={selectedProduct.company} required />
            </label>
            <br />

            <button type="submit" style={styles.updateSubmitButton}>
              Update Product
            </button>
          </form>
        </div>
      )}
         <ToastContainer />
    </div>
  );
};

export default ProductList;

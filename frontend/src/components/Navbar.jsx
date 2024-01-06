import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
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
    backgroundColor: '#333',

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
};

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Trigger logout function from parent component
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {token && (
            <>
              <li style={styles.navItem}>
                <Link to="/products" style={styles.link}>ProductList</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/add-product" style={styles.link}>Add Products</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/feature-product" style={styles.link}>Feature Products</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/filtered-price" style={styles.link}>Filtered Price Products</Link>
              </li>
              <li style={styles.navItem}>
              <button onClick={handleLogout} style={{ backgroundColor: 'black', color: 'white', ...styles.link }}>
  Logout
</button>

              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import FeaturedProducts from './components/FeaturedProducts';
import FilteredProducts from './components/FilteredProducts';
import Navbar from './components/Navbar';

const App = () => {
  // const [token, setToken] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  // const handleLogin = (newToken) => {
  //   setToken(newToken);
  //   console.log(newToken);
  // };
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <>
    <Router>
     <Navbar token={token} onLogout={handleLogout} />
    {/* <Navbar token={token} /> */}
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/login"
          element={<LoginForm onLogin={handleLogin} />}
        />
        <Route
          path="/products"
          element={token ? <ProductList token={token}/> : <Navigate to="/login" />}
        />
            <Route
          path="/feature-product"
          element={token ? <FeaturedProducts token={token} /> : <Navigate to="/login" />}
          />  
           <Route
          path="/filtered-price"
          element={token ? <FilteredProducts token={token} /> : <Navigate to="/login" />}
          />  

        <Route
          path="/add-product"
          element={token ? <AddProductForm token={token} /> : <Navigate to="/login" />}
        />
           

        <Route
          path="/productform"
          element={token ? <Navigate to="/add-product" /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </>
  );
};

export default App;

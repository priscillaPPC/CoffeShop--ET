import React, { useState } from 'react';
import Layout from "./components/Layout";
import ProductList from "./components/ProductList"; 
import RegistroForm from "./components/RegistroForm"; 
import AdminDashboard from "./components/AdminDashboard";
import Cart from "./components/Cart";
import LoginForm from "./components/LoginForm";
import AboutUs from "./components/AboutUs"; 
import BlogPage from "./components/BlogPage"; 
import ContactPage from "./components/ContactPage"; 
import './App.css'; // Estilos css(tengo que  borrar los que ya no ocupo mvgmfkdgv gf )

function App() {
  const [currentView, setCurrentView] = useState('home'); 

 
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <ProductList />;
      case 'registro':
        return <RegistroForm />;
      case 'login':
        return <LoginForm setView={setCurrentView} />;
      case 'carrito':
        return <Cart />;
      case 'admin':
        return <AdminDashboard />;
      case 'contacto':
        return <ContactPage setView={setCurrentView} />;
      case 'nosotros':
        return <AboutUs />; 
      case 'blogs':
        return <BlogPage />;
      default:
        return <ProductList />;
    }
  };

  return (
    
    <Layout setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;
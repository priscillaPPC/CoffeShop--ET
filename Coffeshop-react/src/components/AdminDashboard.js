import React, { useState } from 'react';
import { Tabs, Tab, Container, Button } from 'react-bootstrap';
import UserTable from './UserTable'; 
import ProductTable from './ProductTable'; 
import ProductForm from './ProductForm'; 
import UserForm from './UserForm'; 
import ContactReport from './ContactReport'; 

const AdminDashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0); 
    const [view, setView] = useState('list'); 
    const [productToEdit, setProductToEdit] = useState(null); 
    const [userToEdit, setUserToEdit] = useState(null); 


    const forceRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    // guardado de productos
    const handleProductSubmit = () => {
        setProductToEdit(null);
        setView('list'); 
        forceRefresh(); 
    };

    // guardado de usuarios
    const handleUserSubmit = () => {
        setUserToEdit(null);
        setView('list');
        forceRefresh(); 
    };
    

    const renderProductView = () => {
        if (view === 'product-form') {
            return (
                <ProductForm 
                    initialData={productToEdit} 
                    onSubmit={handleProductSubmit}
                    onCancel={() => setView('list')}
                />
            );
        }
        return (
            <>
                <Button 
                    variant="primary" 
                    className="my-3" 
                    onClick={() => { setProductToEdit(null); setView('product-form'); }}
                >
                    + Crear Nuevo Producto
                </Button>
                <ProductTable 
                    onEdit={(product) => handleEditProduct(product)} 
                    refreshKey={refreshKey} 
                />
            </>
        );
    };
    
    const renderUserView = () => {
        if (view === 'user-form') {
            return (
                <UserForm 
                    initialData={userToEdit} 
                    onSubmit={handleUserSubmit}
                    onCancel={() => setView('list')}
                />
            );
        }
        return (
            <>
                <Button 
                    variant="success" 
                    className="my-3" 
                    onClick={() => { setUserToEdit(null); setView('user-form'); }}
                >
                    + Crear Nuevo Usuario
                </Button>
                <UserTable 
                    onEdit={(user) => handleEditUser(user)} 
                    refreshKey={refreshKey} 
                />
            </>
        );
    };
    
    const handleEditProduct = (product) => { setProductToEdit(product); setView('product-form'); };
    const handleEditUser = (user) => { setUserToEdit(user); setView('user-form'); };


    return (
        <Container className="my-5">
            <h1 className="text-center">Panel de Administración</h1>

            <Tabs defaultActiveKey="productos" id="admin-tabs" className="mb-3">
                
                <Tab eventKey="productos" title="Gestión de Productos">
                    <h3 className="mt-3">Crear, Editar y Listar Productos</h3>
                    {renderProductView()}
                </Tab>
                
                <Tab eventKey="usuarios" title="Gestión de Usuarios">
                    <h3 className="mt-3">Gestión de Clientes y Roles</h3>
                    {renderUserView()}
                </Tab>

                <Tab eventKey="reportes" title="Reportes">
                    <h3 className="mt-3">Mensajes de Contacto</h3>
                    <ContactReport />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default AdminDashboard;
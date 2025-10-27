import React, { useState } from 'react';
import { Tabs, Tab, Container, Button } from 'react-bootstrap';
import UserTable from './UserTable';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import UserForm from './UserForm';
import ContactReport from './ContactReport';

const AdminDashboard = () => {
    // Estados para gestionar la vista y la actualización
    const [refreshKey, setRefreshKey] = useState(0);
    const [view, setView] = useState('list');
    const [productToEdit, setProductToEdit] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);

    // Fuerza la actualización de las tablas
    const forceRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    // Manejadores para formularios
    const handleProductSubmit = () => {
        setProductToEdit(null);
        setView('list');
        forceRefresh();
    };

    const handleUserSubmit = () => {
        setUserToEdit(null);
        setView('list');
        forceRefresh();
    };

    // Manejadores para edición
    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setView('product-form');
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setView('user-form');
    };

    // Renderizado condicional para productos
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
                    onClick={() => {
                        setProductToEdit(null);
                        setView('product-form');
                    }}
                >
                    + Crear Nuevo Producto
                </Button>
                <ProductTable
                    onEdit={handleEditProduct}
                    refreshKey={refreshKey}
                />
            </>
        );
    };

    // Renderizado condicional para usuarios
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
                    onClick={() => {
                        setUserToEdit(null);
                        setView('user-form');
                    }}
                >
                    + Crear Nuevo Usuario
                </Button>
                <UserTable
                    onEdit={handleEditUser}
                    refreshKey={refreshKey}
                />
            </>
        );
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Panel de Administración</h1>

            <Tabs defaultActiveKey="productos" id="admin-tabs" className="mb-4">
                <Tab eventKey="productos" title="Gestión de Productos">
                    <h3 className="mt-4 mb-3">Crear, Editar y Listar Productos</h3>
                    {renderProductView()}
                </Tab>

                <Tab eventKey="usuarios" title="Gestión de Usuarios">
                    <h3 className="mt-4 mb-3">Gestión de Clientes y Roles</h3>
                    {renderUserView()}
                </Tab>

                <Tab eventKey="reportes" title="Reportes">
                    <h3 className="mt-4 mb-3">Mensajes de Contacto</h3>
                    <ContactReport />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default AdminDashboard;
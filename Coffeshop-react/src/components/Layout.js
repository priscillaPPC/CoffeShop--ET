import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import '../App.css'; 

const Layout = ({ children, setView = () => {} }) => {

    const getCartTotal = () => {
        try {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            return carrito.reduce((sum, item) => sum + (Number(item.precio) || 0), 0)
                         .toLocaleString('es-CL');
        } catch {
            return '0';
        }
    };

    return (
        <>
            <Navbar expand="lg" className="sticky-top mi-navbar" variant="dark">
                <Container>
                    
                        <Navbar.Brand 
                        onClick={() => setView('home')} 
                        style={{ cursor: 'pointer', padding: 0 }} 
                    >

                        <img 
                            src="/imagenes/logo.png" 
                            alt="Logo de la Cafetería" 
                            className="logo" 
                        />
                    </Navbar.Brand>

                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        

                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setView('home')}>Home</Nav.Link>
                            <Nav.Link onClick={() => setView('registro')}>Registro</Nav.Link>
                            <Nav.Link onClick={() => setView('admin')}>Admin</Nav.Link>
                            <Nav.Link onClick={() => setView('nosotros')}>Nosotros</Nav.Link>
                            <Nav.Link onClick={() => setView('blogs')}>Blogs</Nav.Link>
                            <Nav.Link onClick={() => setView('contacto')}>Contacto</Nav.Link>
                        </Nav>

                        {/* Botón del Carrito */}
                        <Button 
                            variant="success"
                            onClick={() => setView('carrito')}
                            className="ms-3"
                            style={{ backgroundColor: '#af4c82ff', borderColor: '#ffffffff' }}
                        >
                            🛒 ${getCartTotal()}
                        </Button>

                        {/* Botones de Login/Crear Cuenta */}
                        <Nav>
                            <Button variant="outline-light" onClick={() => setView('login')} className="ms-3">
                                Iniciar Sesión
                            </Button>
                            <Button variant="info" onClick={() => setView('registro')} className="ms-2">
                                Crear Cuenta
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="main-content" style={{ minHeight: '80vh' }}>
                {children} 
            </Container>

            <footer className="bg-dark text-white text-center py-3 mt-5">
                <Container>
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} Coffee Shop.
                    </p>
                </Container>
            </footer>
        </>
    );
};

export default Layout;
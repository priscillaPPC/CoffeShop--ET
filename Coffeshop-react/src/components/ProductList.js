import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { addToCartLS } from '../data/data'; 


const API_URL = 'http://localhost:8080/api/v1/products';

const ProductList = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {


                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();

                setProducts(data);
                
            } catch (err) {

                setError('Error al conectar con la API o al obtener datos: ' + err.message);
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 


    const handleAddToCart = (product) => {
        addToCartLS(product); 
    };

    if (loading) {
        return <h2 className="text-center my-5">Cargando productos desde la API...</h2>;
    }

    if (error) {

        return (
            <Alert variant="danger" className="my-5 text-center">
                <h2>⚠️ Error de Conexión o Autenticación</h2>
                <p>El backend está respondiendo, pero no se pudieron cargar los datos. Esto es normal si la API requiere autenticación para la lista de productos y no se ha enviado un token válido.</p>
                <p>Detalle: {error}</p>
            </Alert>
        );
    }
    

    if (products.length === 0) {
        return <Alert variant="info" className="my-5 text-center">No hay productos activos en la base de datos.</Alert>;
    }


    return (
        <div className="my-5">
            <h1 className="text-center">Nuestros Productos (Cargados desde la API)</h1>
            
            {/* Row y Col para un diseño responsivo  */}
            <Row xs={1} md={2} lg={4} className="g-4">
                {products.map(producto => (
                    <Col key={producto.id}>
                        {/* Importante: Usamos las propiedades del modelo Java (name, price) */}
                        <Card className="h-100 text-center producto-item">
                            {/* Ajustamos la fuente de la imagen. El backend no tiene el campo 'imagen', 
                                así que usamos una imagen fija por defecto ('coffe1.png') */}
                            <Card.Img variant="top" src={`/imagenes/coffe1.png`} style={{ height: '180px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title as="h5">
                                    <a href={`#detalle-producto/${producto.id}`}>{producto.name}</a>
                                </Card.Title>
                                <Card.Text className="text-muted">{producto.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                {/* Formateo a CLP asumiendo que el valor viene como número */}
                                <span className="fw-bold fs-5">${(producto.price || 0).toLocaleString('es-CL')}</span>
                                {/* Botón del carrito */}
                                <Button 
                                    variant="success" 
                                    onClick={() => handleAddToCart(producto)}
                                >
                                    Añadir
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;
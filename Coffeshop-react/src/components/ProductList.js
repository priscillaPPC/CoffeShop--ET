import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { getProductsLS, addToCartLS, productosIniciales } from '../data/data'; 

const ProductList = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        setProducts(getProductsLS()); 
    }, []); 

    // "Añadir al carrito"
    const handleAddToCart = (product) => {
        addToCartLS(product); 
    };

    return (
        <div className="my-5">
            <h1 className="text-center">Nuestros Productos</h1>
            
            {/* Row y Col para un diseño responsivo  */}
            <Row xs={1} md={2} lg={4} className="g-4">
                {products.map(producto => (
                    <Col key={producto.id}>
                        {/*reactbootstrap para cada producto */}
                        <Card className="h-100 text-center producto-item">
                            {/* imagenes */}
                            <Card.Img variant="top" src={`/imagenes/${producto.imagen}`} style={{ height: '180px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title as="h5">
                                    {/* detalle del producto */}
                                    <a href={`#detalle-producto/${producto.id}`}>{producto.nombre}</a>
                                </Card.Title>
                                <Card.Text className="text-muted">{producto.descripcion}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                {/* precio*/}
                                <span className="fw-bold fs-5">${producto.precio.toLocaleString('es-CL')}</span>
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
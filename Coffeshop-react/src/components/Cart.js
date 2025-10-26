import React, { useState, useEffect } from 'react';
import { Button, Table, Alert, Row, Col } from 'react-bootstrap';
import { getProductsLS } from '../data/data';

const getCartItems = () => {
    return JSON.parse(localStorage.getItem('carrito')) || [];
};

// Carrito
const Cart = () => {
    const [cartItems, setCartItems] = useState(getCartItems());
    // Guarda el total 
    const [total, setTotal] = useState(0);

    // calcular el total cada vez cambiamos algo en el carrtio
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += (Number(item.precio) || 0); 
        });
        setTotal(total);
    }, [cartItems]);

    const updateCart = (newCart) => {
        localStorage.setItem('carrito', JSON.stringify(newCart));
        setCartItems(newCart);
    };

    const decreaseQuantity = (id) => {
        let currentCart = getCartItems();
        const index = currentCart.findIndex(item => item.id === id);
        if (index !== -1) {
            currentCart.splice(index, 1); 
            updateCart(currentCart);
        }
    };

    const increaseQuantity = (id) => {
        const productData = getProductsLS();
        const productToAdd = productData.find(p => p.id === id);
        if (productToAdd) {
            let currentCart = getCartItems();
            currentCart.push(productToAdd);
            updateCart(currentCart);
        }
    };

    const removeAllItems = (id) => {
        let currentCart = getCartItems();
        const newCart = currentCart.filter(item => item.id !== id);
        updateCart(newCart);
    };

    const handleCheckout = () => {
        alert(`Total a pagar: $${total.toLocaleString('es-CL')}. ¡Simulación de pago exitosa!`);
        updateCart([]); // Vaciar el carrito
    }; // <- aquí faltaba cerrar la función

    const displayItems = cartItems.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, cantidad: 0 };
        }
        acc[item.id].cantidad++;
        return acc;
    }, {});
    
    if (cartItems.length === 0) {
        return <Alert variant="info" className="my-5 text-center">Tu carrito está vacío.</Alert>;
    }
    
    return (
        <div className="my-5">
            <h1 className="mb-4">Mi Carrito de Compras</h1>
            <Table striped bordered hover responsive>
                <tbody>
                    {Object.values(displayItems).map(item => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>${item.precio.toLocaleString('es-CL')}</td>
                            <td>
                                <Button size="sm" variant="outline-primary" onClick={() => decreaseQuantity(item.id)} disabled={item.cantidad <= 1}>-</Button>
                                <span className="mx-2">{item.cantidad}</span>
                                <Button size="sm" variant="outline-primary" onClick={() => increaseQuantity(item.id)}>+</Button>
                            </td>
                            <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => removeAllItems(item.id)}>Eliminar todo</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            <Row className="justify-content-end mt-4">
                <Col md={4} className="text-end">
                    <h3 className="fw-bold">Total a pagar: ${total.toLocaleString('es-CL')}</h3>
                    <Button variant="success" size="lg" className="w-100 mt-3" onClick={handleCheckout}>
                        Pagar Ahora
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;
import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { getProductsLS } from '../data/data';


const ProductTable = ({ onEdit, refreshKey }) => { 
    const [products, setProducts] = useState([]);
    
    // recargar los datos del localStorage
    const loadProducts = () => {
        setProducts(getProductsLS());
    };

  
    useEffect(() => {
        loadProducts();
    }, [refreshKey]); 

    // Eliminar un producto
    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de eliminar este producto?')) {
            let currentProducts = getProductsLS();
            const updatedProducts = currentProducts.filter(p => p.id !== id);
            localStorage.setItem('productos', JSON.stringify(updatedProducts));
            loadProducts(); // Recarga la tabla 
        }
    };

    if (products.length === 0) {
        return <Alert variant="info" className="mt-4 text-center">No hay productos en el inventario.</Alert>;
    }

    return (
        <Table striped bordered hover responsive className="mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map(producto => (
                    <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>${producto.precio.toLocaleString('es-CL')}</td>
                        <td>{producto.stock}</td>
                        <td>{producto.categoria}</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(producto)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(producto.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductTable;
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { getProductsLS } from '../data/data';

// Componente para crear y editar productos en el panel de administrador
const ProductForm = ({ initialData, onSubmit, onCancel }) => {
    
    const [formData, setFormData] = useState(initialData || {
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        imagen: '' 
    });

    const [errors, setErrors] = useState({});
    

    const isEditing = initialData && initialData.id; 

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Validación y guardado
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        // Validaciones
        if (!formData.nombre) newErrors.nombre = 'Nombre requerido.';
        if (!formData.codigo) newErrors.codigo = 'Código requerido.';

        const precioFloat = parseFloat(formData.precio);
        const stockInt = parseInt(formData.stock);

        if (precioFloat < 0 || isNaN(precioFloat)) newErrors.precio = 'Precio inválido (mín. 0).';
        if (stockInt < 0 || !Number.isInteger(stockInt)) newErrors.stock = 'Stock inválido (entero, mín. 0).';
        if (!formData.categoria) newErrors.categoria = 'Categoría requerida.';
        
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // guardar editar
            let products = getProductsLS();
            const productToSave = { ...formData, precio: precioFloat, stock: stockInt };

            if (isEditing) {
                // cambiaa el producto existente
                const index = products.findIndex(p => p.id === initialData.id);
                products[index] = { ...productToSave, id: initialData.id };
                alert('Producto actualizado con éxito.');
            } else {
                // Asigna un id
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push({ ...productToSave, id: newId });
                alert('Producto creado con éxito.');
            }
            
            localStorage.setItem('productos', JSON.stringify(products));
            onSubmit(); //actualiza la vista principal
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="my-4 p-4 border rounded bg-light">
            <h4 className="mb-4">{isEditing ? `Editar Producto ID: ${initialData.id}` : 'Crear Nuevo Producto'}</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Código Producto</Form.Label>
                        <Form.Control 
                            type="text" id="codigo" value={formData.codigo} 
                            onChange={handleChange} isInvalid={!!errors.codigo} 
                            placeholder="Ej: CAF001"
                        />
                        <Form.Control.Feedback type="invalid">{errors.codigo}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            type="text" id="nombre" value={formData.nombre} 
                            onChange={handleChange} isInvalid={!!errors.nombre} 
                            placeholder="Ej: Café Espresso"
                        />
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    as="textarea" rows={3} id="descripcion" value={formData.descripcion} 
                    onChange={handleChange} placeholder="Detalle del producto"
                />
            </Form.Group>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio ($)</Form.Label>
                        <Form.Control 
                            type="number" id="precio" value={formData.precio} 
                            onChange={handleChange} isInvalid={!!errors.precio} min="0"
                            step="0.01" 
                        />
                        <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control 
                            type="number" id="stock" value={formData.stock} 
                            onChange={handleChange} isInvalid={!!errors.stock} min="0"
                            step="1" 
                        />
                        <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select id="categoria" value={formData.categoria} onChange={handleChange} isInvalid={!!errors.categoria}>
                            <option value="">-- Seleccione --</option>
                            <option value="Cafés">Cafés</option>
                            <option value="Pasteles">Pasteles</option>
                            <option value="Helados">Helados</option>
                            <option value="Granos">Granos</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.categoria}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            
            <Form.Group className="mb-3">
                <Form.Label>Imagen (Ruta/Archivo)</Form.Label>
                <Form.Control type="text" id="imagen" value={formData.imagen} onChange={handleChange} placeholder="Ej: coffe1.ppg" />
            </Form.Group>

            <Button variant="success" type="submit" className="me-2">
                {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
                Cancelar
            </Button>
        </Form>
    );
};

export default ProductForm;
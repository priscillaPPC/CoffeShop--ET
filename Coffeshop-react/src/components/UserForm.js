import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getUsersLS } from '../data/data';

// Componente para crear y editar usuarios en el panel de administrador

const UserForm = ({ initialData, onSubmit, onCancel }) => {
    
    const [formData, setFormData] = useState(initialData || {
        rut: '',
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        tipoUsuario: '', 
        direccion: ''
    });

    const [errors, setErrors] = useState({});
    

    const isEditing = initialData && initialData.rut;
    
    
    const emailPattern = /^[^\s@]+@(?:duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

  
    const validate = () => {
        const newErrors = {};
        
        // Validación de campos 
        if (!formData.rut) newErrors.rut = 'RUT requerido.';
        if (!formData.nombre) newErrors.nombre = 'Nombre requerido.';
        if (!formData.apellido) newErrors.apellido = 'Apellido requerido.';
        if (!formData.direccion) newErrors.direccion = 'Dirección requerida.';
        if (!formData.tipoUsuario) newErrors.tipoUsuario = 'Rol requerido.';

    
        if (!/^[0-9]+[0-9K]$/i.test(formData.rut)) newErrors.rut = 'Formato de RUT no válido (ej: 19011022K).';
        
        // Validación de email
        if (!emailPattern.test(formData.email)) newErrors.email = 'Correo inválido o dominio no permitido.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // LocalStorage
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            let users = getUsersLS();
            const userToSave = { ...formData };

            if (isEditing) {
                
                const index = users.findIndex(u => u.rut === initialData.rut);
                users[index] = { ...userToSave };
                alert('Usuario actualizado con éxito.');
            } else {
               
                if (users.some(u => u.rut === userToSave.rut)) {
                    alert('Error: El RUT ya se encuentra registrado.');
                    return;
                }
                users.push(userToSave);
                alert('Usuario creado con éxito.');
            }
            
            localStorage.setItem('usuarios', JSON.stringify(users));
            onSubmit();
        }
    };
    
    

    return (
        <Form onSubmit={handleSubmit} className="my-4 p-4 border rounded bg-light">
            <h4 className="mb-4">{isEditing ? `Editar Usuario RUT: ${initialData.rut}` : 'Crear Nuevo Usuario'}</h4>
            
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control 
                            type="text" id="rut" value={formData.rut} 
                            onChange={handleChange} isInvalid={!!errors.rut} 
                            placeholder="Ej: 19011022K" 
                            disabled={isEditing} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.rut}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rol de Usuario</Form.Label>
                        <Form.Select id="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} isInvalid={!!errors.tipoUsuario}>
                            <option value="">-- Seleccione --</option>
                            <option value="administrador">Administrador</option>
                            <option value="vendedor">Vendedor</option>
                            <option value="cliente">Cliente</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.tipoUsuario}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" id="nombre" value={formData.nombre} onChange={handleChange} isInvalid={!!errors.nombre} />
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" id="apellido" value={formData.apellido} onChange={handleChange} isInvalid={!!errors.apellido} />
                        <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" id="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} placeholder="ejemplo@duocuc.cl" />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" id="direccion" value={formData.direccion} onChange={handleChange} isInvalid={!!errors.direccion} placeholder="Calle, número, depto..." />
                <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
            </Form.Group>
            
            <Button variant="success" type="submit" className="me-2">
                {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
                Cancelar
            </Button>
        </Form>
    );
};

export default UserForm;
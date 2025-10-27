import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

// página de Contacto
const ContactPage = ({ setView }) => {
    const [formData, setFormData] = useState({ nombre: '', correo: '', comentario: '' });
    const [errors, setErrors] = useState({});


    const emailPattern = /^[^\s@]+@(?:duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    const validate = () => {
        const newErrors = {};
        

        if (!formData.nombre) newErrors.nombre = 'Nombre requerido.';
        if (formData.nombre.length > 100) newErrors.nombre = 'Máximo 100 caracteres.';

        if (!emailPattern.test(formData.correo)) newErrors.correo = 'Correo inválido o dominio no permitido.';
        if (formData.correo.length > 100) newErrors.correo = 'Máximo 100 caracteres.';
        
        if (!formData.comentario) newErrors.comentario = 'Comentario requerido.';
        if (formData.comentario.length > 500) newErrors.comentario = 'Máximo 500 caracteres.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            
            const nuevoMensaje = {
                id: Date.now(),
                nombre: formData.nombre,
                correo: formData.correo,
                comentario: formData.comentario,
                fecha: new Date().toLocaleDateString(),
            };

            let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
            mensajes.push(nuevoMensaje);
            localStorage.setItem('mensajes', JSON.stringify(mensajes));

            alert(`Mensaje enviado de ${formData.nombre}. Gracias por contactarnos.`);
            
            setFormData({ nombre: '', correo: '', comentario: '' });
            setErrors({});
            setView('home'); // Redirige al Home 
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={7} lg={5}>
                    <h2 className="text-center mb-4">Formulario de Contacto</h2>
                    <Form onSubmit={handleSubmit} className="formLogin"> 
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="text" id="nombre" value={formData.nombre} 
                                onChange={handleChange} isInvalid={!!errors.nombre} 
                            />
                            <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control 
                                type="email" id="correo" value={formData.correo} 
                                onChange={handleChange} isInvalid={!!errors.correo} 
                            />
                            <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control 
                                as="textarea" rows={4} id="comentario" value={formData.comentario} 
                                onChange={handleChange} isInvalid={!!errors.comentario} 
                            />
                            <Form.Control.Feedback type="invalid">{errors.comentario}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Button type="submit" variant="primary" className="w-100">Enviar Mensaje</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const emailPattern = /^[^\s@]+@(?:duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

const LoginForm = ({ setView }) => {
    // Almacena los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };


    const validate = () => {
        const newErrors = {};
        
        // Validación de correo
        if (!formData.email) { newErrors.email = 'El correo es requerido.'; }
        else if (!emailPattern.test(formData.email)) { newErrors.email = 'Correo inválido o dominio no permitido.'; }

        // Validación de contraseña
        if (!formData.password) { newErrors.password = 'La contraseña es requerida.'; }
        else if (formData.password.length < 4 || formData.password.length > 10) { 
            newErrors.password = 'Debe tener entre 4 y 10 caracteres.'; 
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (validate()) {

            alert('✅ Inicio de sesión exitoso. Redirigiendo...');

            setFormData({ email: '', password: '' });
            setErrors({});
            setView('home'); // Redirigir al Home
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={5}>
                    <div className="contLogin">
                        <Form onSubmit={handleSubmit} className="formLogin">
                            <h2 className="text-center mb-4">Iniciar Sesión</h2>

                            {/* Campo Correo Electrónico */}
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="email" id="email" placeholder="Correo electrónico" 
                                    value={formData.email} onChange={handleChange} 
                                    isInvalid={!!errors.email} 
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Contraseña */}
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="password" id="password" placeholder="Contraseña" 
                                    value={formData.password} onChange={handleChange} 
                                    isInvalid={!!errors.password} 
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            
                            <Button type="submit" variant="primary" className="w-100 mt-3">Entrar</Button>

                            <p className="mt-3">¿No tienes una cuenta?
                                <br/><a className="reg" onClick={() => setView('registro')} style={{ cursor: 'pointer', color: '#3E2723' }}>Regístrate</a>
                            </p>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
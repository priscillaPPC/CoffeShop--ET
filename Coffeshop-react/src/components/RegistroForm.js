import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { regionesComunas } from '../data/data'; 

const RegistroForm = () => {
  
    const [formData, setFormData] = useState({
        nombreCompleto: '', correo: '', repetirCorreo: '', contrasena: '', confirmarContrasena: '',
        telefono: '', region: '', comuna: ''
    });
    
    
    const [errors, setErrors] = useState({});

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    //  validación 
    const validate = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@(?:duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        
        // Validaciones
        if (!formData.nombreCompleto) { newErrors.nombreCompleto = 'Nombre completo es requerido.'; }
        
        if (!emailPattern.test(formData.correo)) { newErrors.correo = 'Correo inválido o dominio no permitido.'; }
        if (formData.correo !== formData.repetirCorreo) { newErrors.repetirCorreo = 'Los correos no coinciden.'; }
        
        if (formData.contrasena.length < 4 || formData.contrasena.length > 10) { 
            newErrors.contrasena = 'Debe tener entre 4 y 10 caracteres.'; 
        }
        if (formData.contrasena !== formData.confirmarContrasena) { newErrors.confirmarContrasena = 'Las contraseñas no coinciden.'; }
        
        if (!formData.region) { newErrors.region = 'Seleccione una región.'; }
        if (formData.region && !formData.comuna) { newErrors.comuna = 'Seleccione una comuna.'; }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // localStorage
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (validate()) {
            
            // División de nombre/ apellido para la lista que está en el panel del admin 
            const nombreCompleto = formData.nombreCompleto.trim();
           
            const partesDelNombre = nombreCompleto.split(/\s+/).filter(p => p.length > 0); 
            
            // La primera palabra es el nombre
            const nombre = partesDelNombre[0] || ''; 
            // El resto de las palabras forman el apellido
            const apellido = partesDelNombre.slice(1).join(' ') || ''; 
            // ⬆️ FIN LÓGICA DE CORRECCIÓN ⬆️

            const newUser = {
                id: Date.now(), 
                nombre: nombre, // 'nombre' para la tabla
                apellido: apellido, // 'apellido' para la tabla
                
                correo: formData.correo,
                contrasena: formData.contrasena,
                telefono: formData.telefono, 
                region: formData.region,
                comuna: formData.comuna,
                rol: 'cliente' 
            };
            
            let users = JSON.parse(localStorage.getItem('usuarios')) || [];
            users.push(newUser);
            localStorage.setItem('usuarios', JSON.stringify(users));

            alert('✅ Registro exitoso. Usuario guardado.');
            // Limpiar formulario después del envío
            setFormData({nombreCompleto: '', correo: '', repetirCorreo: '', contrasena: '', confirmarContrasena: '', telefono: '', region: '', comuna: ''});
            setErrors({}); 
        }
    };

    // selector de comunas
    const comunas = formData.region ? regionesComunas[formData.region] : [];

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={7} lg={5}>
                    <div className="formLogin"> 
                        <h2 className="text-center mb-4">Registro de Usuario</h2>
                        
                        <Form onSubmit={handleSubmit}>
                            {/* Campo Nombre Completo */}
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control 
                                    type="text" id="nombreCompleto" placeholder="Nombre completo" 
                                    value={formData.nombreCompleto} onChange={handleChange} 
                                    isInvalid={!!errors.nombreCompleto} 
                                />
                                <Form.Control.Feedback type="invalid">{errors.nombreCompleto}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Correo y Repetir Correo */}
                            <Form.Group className="mb-3">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control type="email" id="correo" placeholder="ejemplo@duocuc.cl" value={formData.correo} onChange={handleChange} isInvalid={!!errors.correo} />
                                <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" id="repetirCorreo" placeholder="Repetir Correo" value={formData.repetirCorreo} onChange={handleChange} isInvalid={!!errors.repetirCorreo} />
                                <Form.Control.Feedback type="invalid">{errors.repetirCorreo}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Contraseñas */}
                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" id="contrasena" placeholder="Mínimo 4 caracteres" value={formData.contrasena} onChange={handleChange} isInvalid={!!errors.contrasena} />
                                <Form.Control.Feedback type="invalid">{errors.contrasena}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" id="confirmarContrasena" placeholder="Confirmar Contraseña" value={formData.confirmarContrasena} onChange={handleChange} isInvalid={!!errors.confirmarContrasena} />
                                <Form.Control.Feedback type="invalid">{errors.confirmarContrasena}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Teléfono */}
                            <Form.Group className="mb-3">
                                <Form.Label>Teléfono (Opcional)</Form.Label>
                                <Form.Control type="tel" id="telefono" placeholder="9xxxxxxxx" value={formData.telefono} onChange={handleChange} />
                            </Form.Group>

                            <Row>
                                {/* Selector de Región */}
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label>Región</Form.Label>
                                    <Form.Select id="region" value={formData.region} onChange={handleChange} isInvalid={!!errors.region}>
                                        <option value="">- Seleccione -</option>
                                        {Object.keys(regionesComunas).map(key => (
                                            <option key={key} value={key}>{key.replace(/-/g, ' ').toUpperCase()}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                                </Form.Group>

                                {/* Selector de Comuna (Dinámico) */}
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label>Comuna</Form.Label>
                                    <Form.Select id="comuna" value={formData.comuna} onChange={handleChange} disabled={!formData.region} isInvalid={!!errors.comuna}>
                                        <option value="">- Seleccione -</option>
                                        {comunas.map(comuna => (
                                            <option key={comuna} value={comuna}>{comuna}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.comuna}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            
                            <Button type="submit" variant="primary" className="w-100 mt-3">Registrar</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistroForm;
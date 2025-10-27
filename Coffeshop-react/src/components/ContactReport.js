import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Container } from 'react-bootstrap';

const ContactReport = () => {
    //Almacena los mensajes
    const [messages, setMessages] = useState([]);

   
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('mensajes')) || [];
        setMessages(storedMessages);
    }, []);

    // eliminar todos los mensajes)
    const clearReport = () => {
        if (window.confirm('¿Está seguro de eliminar TODOS los mensajes? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('mensajes');
            setMessages([]); // Limpia el estado
            alert('Reporte de mensajes eliminado.');
        }
    };


    if (messages.length === 0) {
        return (
            <Alert variant="secondary" className="my-4 text-center">
                No hay mensajes de contacto en el reporte.
            </Alert>
        );
    }

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Reporte de Mensajes Recibidos ({messages.length})</h4>
                <Button variant="danger" size="sm" onClick={clearReport}>Limpiar Reporte</Button>
            </div>
            
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((msg, index) => (
                        <tr key={msg.id || index}>
                            <td>{msg.id}</td>
                            <td>{msg.fecha}</td>
                            <td>{msg.nombre}</td>
                            <td>{msg.correo}</td>
                            <td style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{msg.comentario}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ContactReport;
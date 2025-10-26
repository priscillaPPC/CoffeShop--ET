import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { getUsersLS } from '../data/data'; 


const UserTable = ({ onEdit, refreshKey }) => {
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        const storedUsers = getUsersLS();
        
        setUsers(storedUsers);
    };

    
    useEffect(() => {
        loadUsers();
    }, [refreshKey]); 

    // Eliminar un usuario por RUT
    const handleDelete = (rut) => {
        if (window.confirm(`¿Está seguro de eliminar el usuario con RUT ${rut}?`)) {
            let currentUsers = getUsersLS();
            const updatedUsers = currentUsers.filter(user => user.rut !== rut);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsers));
            loadUsers(); // Recarga la tabla 
        }
    };

    if (users.length === 0) {
        return <Alert variant="info" className="mt-4 text-center">No hay usuarios registrados.</Alert>;
    }

    return (
        <Table striped bordered hover responsive className="mt-4">
            <thead>
                <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.rut || index}>
                        <td>{user.rut || 'N/A'}</td>
                        <td>{user.nombre}</td>
                        <td>{user.apellido}</td>
                        <td>{user.email || user.correo}</td>
                        <td>{user.rol || 'cliente'}</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(user)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(user.rut)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UserTable;
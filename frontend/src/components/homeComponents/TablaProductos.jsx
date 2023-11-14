import React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const datosDeEjemplo = [
    { id: 1, nombre: 'Producto1', marca: 'Marca1', tipo: 'Tipo1', precio: '10.00' },
    { id: 2, nombre: 'Producto2', marca: 'Marca2', tipo: 'Tipo2', precio: '20.00' },
    { id: 3, nombre: 'Producto3', marca: 'Marca3', tipo: 'Tipo3', precio: '30.00' },
    // Agrega más datos según sea necesario
];

const TablaProductos = () => {
    const handleEliminar = (id) => {
        // Aquí puedes realizar la lógica para eliminar el registro con el ID proporcionado
        // Puedes utilizar una función o una llamada a una API, dependiendo de tu implementación
        console.log(`Eliminar producto con ID: ${id}`);
    };

    return (
        <Paper elevation={3} style={{ padding: 20, width: '100%' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datosDeEjemplo.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell>{producto.marca}</TableCell>
                                <TableCell>{producto.tipo}</TableCell>
                                <TableCell>{producto.precio}</TableCell>
                                <TableCell>
                                    <DeleteForeverIcon
                                        style={{ cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleEliminar(producto.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TablaProductos;

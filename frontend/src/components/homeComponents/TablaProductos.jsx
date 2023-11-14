import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { addProduct, deleteProduct, setProducts } from '../../store/storeProducts';

const TablaProductos = () => {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.products);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3030/getData');
                const data = await response.json();

                // Dispatch action to set products in the store
                dispatch(setProducts(data.data));
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchItems();
    }, [dispatch]);

    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch('http://localhost:3030/deleteData', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (response.ok) {
                const deletedProductId = await response.json();
                dispatch(deleteProduct(deletedProductId)); // Dispatch action to delete the product from the store
            } else {
                console.error('Error al eliminar el producto:', await response.text());
            }
        } catch (error) {
            console.error('Error en handleDeleteItem:', error);
        }
    };


    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((rowData) => (
                            <TableRow key={rowData.id}>
                                <TableCell>{rowData.nombre}</TableCell>
                                <TableCell>{rowData.marca}</TableCell>
                                <TableCell>{rowData.tipo}</TableCell>
                                <TableCell>{rowData.precio}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteItem(rowData.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TablaProductos;

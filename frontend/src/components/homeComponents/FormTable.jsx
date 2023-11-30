import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { setProducts } from '../../store/storeProducts';
import { useSelector } from 'react-redux';

const FormularioProducto = () => {

    const [item, setItem] = useState({
        nombre: '',
        marca: '',
        tipo: '',
        precio: '',
    });
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetch('http://localhost:3030/getData')
            .then(response => response.json())
            .then(data => {
                setTableData(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
                setLoading(false);
            });

    }, []);

    const handleGetItem = () => {

        fetch('http://localhost:3030/getData')
            .then(response => response.json())
            .then(response => {
                if (response) {
                    setTableData(response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });

    };

    const handleDeleteItem = (id) => {

        fetch(`http://localhost:3030/deleteItem?id=${id}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    if (response < 0) {
                        alert('Error al borrar datos');
                    } else {
                        handleGetItem();
                    }
                }

            })
            .catch(error => {
                console.error('Error al intentar eliminar datos:', error);
            });
    };

    const handleSaveItem = (e) => {

        e.preventDefault();
        if (item.nombre.trim() === '' || item.marca.trim() === '' || item.tipo.trim() === '' || item.precio.trim() === '') {
            console.log("Datos incompletos");
        } else {
            handleSubmit(e);
            handleGetItem();

            // Reseteo de los campos
            setItem({
                nombre: '',
                marca: '',
                tipo: '',
                precio: '',
            });
        }
    };


    const handleInputChange = (event, field) => {
        setItem((prevItem) => ({
            ...prevItem,
            [field]: event.target.value,

        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(item.nombre);

        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            .then(response => {
                if (response === 0) {
                    console.log("Operación fallida");
                }
                handleGetItem();
            })
            .catch(error => {
                console.error('Error al realizar la operación:', error);
            });
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3030/getData');
                const data = await response.json();

                dispatch(setProducts(data.data));
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchItems();
    }, [dispatch]);

    const { userRol } = useSelector((state) => state.login);

    const isAdmin = userRol === 'admin';
    const isGuest = userRol === 'guest';
    const isUser = userRol === 'user';

    return (
        <>
            <Paper elevation={3} style={{ padding: 20, width: '100%' }}>
                <Box component="form" autoComplete="off" onSubmit={handleSaveItem} sx={{ marginBottom: 2, textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nombre"
                                required
                                fullWidth
                                value={item.nombre}
                                onChange={(event) => handleInputChange(event, 'nombre')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Marca"
                                required
                                fullWidth
                                value={item.marca}
                                onChange={(event) => handleInputChange(event, 'marca')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Tipo"
                                required
                                fullWidth
                                value={item.tipo}
                                onChange={(event) => handleInputChange(event, 'tipo')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Precio"
                                required
                                fullWidth
                                value={item.precio}
                                onChange={(event) => handleInputChange(event, 'precio')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {!isGuest && <Button variant="contained" color="primary" type="submit">
                                <Tooltip title="Insertar producto">
                                    <span>
                                        <SaveIcon style={{ marginRight: '8px' }} />
                                        Guardar producto
                                    </span>
                                </Tooltip>
                            </Button>}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <div style={{ margin: '20px 0' }} />

            <TablaProductos tableData={tableData} handleDeleteItem={handleDeleteItem} />
        </>
    );
};

const TablaProductos = ({ tableData, handleDeleteItem }) => {

    const { userRol } = useSelector((state) => state.login);

    const isAdmin = userRol === 'admin';

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Precio</TableCell>
                        {isAdmin && <TableCell>Eliminar</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((rowData) => (
                        <TableRow key={rowData.id}>
                            <TableCell>{rowData.nombre}</TableCell>
                            <TableCell>{rowData.marca}</TableCell>
                            <TableCell>{rowData.tipo}</TableCell>
                            <TableCell>{rowData.precio} €</TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <Tooltip title="Eliminar" arrow>
                                        <IconButton style={{ color: 'red' }} onClick={() => handleDeleteItem(rowData.id)}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FormularioProducto;

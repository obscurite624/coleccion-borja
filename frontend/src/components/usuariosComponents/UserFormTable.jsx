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

const FormularioUsers = () => {

    const [user, setUser] = useState({
        nombre: '',
        login: '',
        password: '',
        rol: '',
    });

    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetch('http://localhost:3030/getUsers')
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

    const handleGetUsers = () => {

        fetch('http://localhost:3030/getUsers')
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

    const handleDeleteUser = (id) => {

        fetch(`http://localhost:3030/deleteUser?id=${id}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    if (response < 0) {
                        alert('Error al borrar datos');
                    } else {
                        handleGetUsers();
                    }
                }

            })
            .catch(error => {
                console.error('Error al intentar eliminar datos:', error);
            });
    };

    const handleSaveUser = (e) => {

        e.preventDefault();
        if (user.nombre.trim() === '' || user.login.trim() === '' || user.password.trim() === '' || user.rol.trim() === '') {
            console.log("Datos incompletos");
        } else {
            handleSubmit(e);
            handleGetUsers();

            // Reseteo de los campos
            setUser({
                nombre: '',
                login: '',
                password: '',
                rol: '',
            });
        }
    };


    const handleInputChange = (event, field) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: event.target.value,

        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.nombre);

        fetch(`http://localhost:3030/addUser?nombre=${user.nombre}&login=${user.login}&password=${user.password}&rol=${user.rol}`)
            .then(response => response.json())
            .then(response => {
                if (response === 0) {
                    console.log("Operación fallida");
                }
                handleGetUsers();
            })
            .catch(error => {
                console.error('Error al realizar la operación:', error);
            });
    };

    const { userRol } = useSelector((state) => state.login);

    const isAdmin = userRol === 'admin';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3030/getUsers');
                const data = await response.json();

                dispatch(setProducts(data.data));
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    return (
        <>
            <Paper elevation={3} style={{ padding: 20, width: '100%' }}>
                <Box component="form" autoComplete="off" onSubmit={handleSaveUser} sx={{ marginBottom: 2, textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid user xs={12} md={6}>
                            <TextField
                                label="Nombre"
                                required
                                fullWidth
                                value={user.nombre}
                                onChange={(event) => handleInputChange(event, 'nombre')}
                            />
                        </Grid>
                        <Grid user xs={12} md={6}>
                            <TextField
                                label="Login"
                                required
                                fullWidth
                                value={user.login}
                                onChange={(event) => handleInputChange(event, 'login')}
                            />
                        </Grid>
                        <Grid user xs={12} md={6}>
                            <TextField
                                label="Password"
                                required
                                fullWidth
                                value={user.password}
                                onChange={(event) => handleInputChange(event, 'password')}
                            />
                        </Grid>
                        <Grid user xs={12} md={6}>
                            <TextField
                                label="Rol"
                                required
                                fullWidth
                                value={user.rol}
                                onChange={(event) => handleInputChange(event, 'rol')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {isAdmin && <Button variant="contained" color="primary" type="submit">
                                <Tooltip title="Insertar usuario">
                                    <span>
                                        <SaveIcon style={{ marginRight: '8px' }} />
                                        Guardar user
                                    </span>
                                </Tooltip>
                            </Button>}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <div style={{ margin: '20px 0' }} />

            <TablaUsuarios tableData={tableData} handleDeleteItem={handleDeleteUser} />
        </>
    );
};

const TablaUsuarios = ({ tableData, handleDeleteItem }) => {

    const { userRol } = useSelector((state) => state.login);
    const isAdmin = userRol === 'admin';

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Rol</TableCell>
                        {isAdmin && <TableCell>Eliminar</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((rowData) => (
                        <TableRow key={rowData.id}>
                            <TableCell>{rowData.nombre}</TableCell>
                            <TableCell>{rowData.login}</TableCell>
                            <TableCell>{rowData.password}</TableCell>
                            <TableCell>{rowData.rol}</TableCell>
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

export default FormularioUsers;

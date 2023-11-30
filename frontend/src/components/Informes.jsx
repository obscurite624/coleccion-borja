import { ThemeProvider } from '@emotion/react';
import ResponsiveAppBar from './homeComponents/ResponsiveAppBar';
import { theme } from '../index';
import { Grid, Box, Button, Tooltip } from '@mui/material';
import TablaInformes from './informesComponents/InformeColeccion';
import TablaUsers from './informesComponents/InformeUsuarios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Informes() {

    const userData = useSelector((state) => state.login);
    const navigate = useNavigate();

    const isLoggedin = userData.isAutenticated;

    useEffect(() => {

        // Autenticación del usuario
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin]);


    const [mostrarTablaColeccion, setMostrarTablaColeccion] = useState(false);

    const handleGenerarInformeColeccion = () => {
        setMostrarTablaColeccion(true);
    };

    const [mostrarTablaUsers, setMostrarTablaUsers] = useState(false);

    const handleGenerarInformeUsers = () => {
        setMostrarTablaUsers(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1559999831-7deaf136d4a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    minHeight: '100vh',
                }}
            >
                <ResponsiveAppBar />

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '20px' }}
                >
                    {mostrarTablaColeccion ? (
                        <TablaInformes />
                    ) : (
                        <Button onClick={handleGenerarInformeColeccion} variant="contained" color="primary">
                            <Tooltip title="Generar Informe Colección">
                                <span>
                                    Generar Informe Colección
                                </span>
                            </Tooltip>
                        </Button>
                    )}
                </Grid>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '20px' }}
                >
                    {mostrarTablaUsers ? (
                        <TablaUsers />
                    ) : (
                        <Button onClick={handleGenerarInformeUsers} variant="contained" color="primary">
                            <Tooltip title="Generar Informe Usuarios">
                                <span>
                                    Generar Informe Usuarios
                                </span>
                            </Tooltip>
                        </Button>
                    )}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default Informes;

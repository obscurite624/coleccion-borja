import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../index';
import { Grid, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './homeComponents/ResponsiveAppBar';
import FormularioProducto from './homeComponents/FormTable';

// Borja Vega Suárez

function Home() {

    const userData = useSelector((state) => state.login);
    const navigate = useNavigate();


    const isLoggedin = userData.isAutenticated;

    useEffect(() => {

        // Autenticación del usuario
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin]);

    // Imprimimos en la consola el contenido de userData
    console.log(userData);

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
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '20px' }}
                >

                    <FormularioProducto />

                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default Home;

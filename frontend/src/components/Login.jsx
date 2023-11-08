import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { theme } from '../index';
import { Grid, Paper, Avatar, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storeLogin';

// Borja Vega Suárez

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${username}&password=${password}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error de conexión');
            }
            return response.json();
          })
          .then(response => {
            if (response.data && response.data.nombre !== undefined) {
              console.log('Te has logueado. Navegando a home.');
              dispatch(loginActions.login({
                name: response.data.nombre,
                rol: response.data.rol
              }));
              navigate('/home');
            } else {
              console.log('Usuario o contraseña incorrectos.');
            }
          })
          .catch(error => {
            console.error('Error de conexión:', error);
          });
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            console.log('Campos vacíos');
        } else {
            isVerifiedUser();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{
                    height: '100vh',
                    backgroundImage: "url(https://images.unsplash.com/photo-1559999831-7deaf136d4a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundSize: 'cover',
                }}
            >
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: 'black', backgroundSize: 'cover' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 250 }}>
                            <Avatar style={{ backgroundColor: theme.palette.primary.main, margin: 5 }}>
                                <img src={require('./images/loginIcon.png')} alt="Login Icon" />
                            </Avatar>
                            <Typography component="h1" variant="h4">
                                Iniciar sesión
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Usuario"
                                    name="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: 3 }}
                                >
                                    Iniciar sesión
                                </Button>
                            </Box>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Login;

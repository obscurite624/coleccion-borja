import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginActions } from '../store/storeLogin';
import { theme } from '../index';
import { Grid, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

// Borja Vega Suárez

function Home() {

    const userData = useSelector(state => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const isLoggedin = userData.isAutenticated

    useEffect(() => {  // Comprobar si el usuario esta autenticado
        if (!isLoggedin) {
            navigate('/login')
        }
    }, [isLoggedin, navigate])

    // Logout
    const handleLogout = () => {
        dispatch(loginActions.logout());
        navigate('/login');
    }
    // Comprobamos por consola qué obtenemos en userData
    console.log(userData)

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
                            <h1>Home de Borja Vega</h1>
                            <h2>Nombre de usuario: {userData.userName}</h2>
                            <h2>Rol: {userData.userRol}</h2>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ margin: 3 }}
                                onClick={handleLogout}
                            >Salir</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default Home
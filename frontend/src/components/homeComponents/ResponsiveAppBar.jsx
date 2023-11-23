import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { loginActions } from '../../store/storeLogin'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


function ResponsiveAppBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userName, userRol } = useSelector((state) => state.login);

    const pagesAdmin = ['Inicio', 'Informes', 'Ayuda'];
    const pages = ['Inicio', 'Ayuda'];
    const settings = [`Nombre: ${userName}`, `Rol: ${userRol}`, 'Logout'];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlePageClick = (page) => {

        // Lógica común para todas las páginas
        if (page === 'Inicio') {
            navigate('/home');
        } else if (page === 'Informes' && userRol === 'user') {
            navigate('/home');

        } else if (page === 'Informes' && userRol === 'admin') {
            navigate('/informes');
        }
    };

    // Logout
    const handleLogout = () => {
        dispatch(loginActions.logout());

    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {userRol === 'admin' ? (
                        <AdminPanelSettingsIcon sx={{ color: 'red', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    ) : (
                        <PersonIcon sx={{ color: 'red', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    )}

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"

                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {userRol === 'admin' ? 'ADMIN' : `${userName.toUpperCase()}`}

                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {(userRol === 'admin' ? pagesAdmin : pages).map((page) => (
                            <MenuItem key={page} onClick={() => handlePageClick(page)}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir menu">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ backgroundColor: 'red', color: '#fff' }}>{userName ? userName.charAt(0).toUpperCase() : ''}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;

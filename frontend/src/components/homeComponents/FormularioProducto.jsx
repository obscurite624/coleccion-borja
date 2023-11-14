import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const FormularioProducto = ({ handleSaveItem }) => {
    const [item, setItem] = useState({
        nombre: '',
        marca: '',
        tipo: '',
        precio: '',
    });

    const handleInputChange = (event, field) => {
        setItem({
            ...item,
            [field]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSaveItem(item);
        setItem({
            nombre: '',
            marca: '',
            tipo: '',
            precio: '',
        });
    };

    return (
        <Paper elevation={3} style={{ padding: 20, width: '100%' }}>
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{ marginBottom: 2, textAlign: 'center' }}
            >
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
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<SaveIcon />}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default FormularioProducto;

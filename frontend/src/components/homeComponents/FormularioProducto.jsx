import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { addProduct } from '../../store/storeProducts';

const FormularioProducto = () => {
    const dispatch = useDispatch();

    const [item, setItem] = useState({
        nombre: '',
        marca: '',
        tipo: '',
        precio: '',
    });


    const handleInputChange = (event, field) => {
        setItem(prevItem => ({
            ...prevItem,
            [field]: event.target.value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3030/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const newProduct = await response.json();
            dispatch(addProduct(newProduct)); // Dispatch action to add the new product to the store
            console.log('Producto guardado con éxito:', newProduct);

            // Reinicia los campos después de guardar
            setItem({
                nombre: '',
                marca: '',
                tipo: '',
                precio: '',
            });
        } catch (error) {
            console.error('Error al guardar el producto:', error.message);
        }
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

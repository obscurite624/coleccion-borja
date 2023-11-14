import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
    isAutenticated: false,
    userName: '',
    userRol: '',
    products: [],  // Agregado para almacenar los productos
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload;
            state.isAutenticated = true;
            state.userName = userData.name;
            state.userRol = userData.rol;
        },
        logout: (state) => {
            state.isAutenticated = false;
            state.userName = '';
            state.userRol = '';
        },
        saveProduct: (state, action) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action) => {
            const productIdToDelete = action.payload;
            // Filtra los productos, manteniendo solo aquellos que no tienen el ID a eliminar
            state.products = state.products.filter((product) => product.id !== productIdToDelete);
        },
    },
});

export const loginActions = authSlice.actions;
export default authSlice.reducer;

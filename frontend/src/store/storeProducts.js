import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
        addProduct: (state, action) => {
            const existingProductIndex = state.findIndex(
                (product) => product.id === action.payload.id
            );

            if (existingProductIndex === -1) {
                return [...state, action.payload];
            } else {
                return state.map((product, index) =>
                    index === existingProductIndex ? action.payload : product
                );
            }
        },
        deleteProduct: (state, action) => {
            return state.filter((product) => product.id !== action.payload);
        },
    },
});

export const { setProducts, addProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
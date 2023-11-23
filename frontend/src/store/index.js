import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './storeLogin';
import productsReducer from './storeProducts';

// Borja Vega Suárez

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
  },
});

export default store;

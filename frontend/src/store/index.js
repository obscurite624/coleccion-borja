import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './storeLogin';
import productsReducer from './storeProducts';

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
  },
});

export default store;

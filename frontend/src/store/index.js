import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './storeLogin';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;

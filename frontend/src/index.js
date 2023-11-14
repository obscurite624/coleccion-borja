import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/index';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff262a',
    },
    secondary: {
      main: '#29b6f6',
      light: '#8BC34A',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#FFA000',
      light: '#FFC107',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
    },
    success: {
      main: '#4CAF50',
      light: '#8BC34A',
    },
  },
  typography: {
    fontFamily: 'Karla',
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

export { theme }; 
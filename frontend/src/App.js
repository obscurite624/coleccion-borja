import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import store from './store'; 

// Borja Vega Suárez

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'home',
        element: <Home />
      }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

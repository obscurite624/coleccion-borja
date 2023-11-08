import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        path: 'login',
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
    <RouterProvider router={router} />
  );
}

export default App;

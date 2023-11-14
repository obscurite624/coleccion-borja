import React from 'react';
import { Provider } from 'react-redux';  // Import Provider
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import store from './store';  // Import your Redux store

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.jsx'
import { GlobalContextProvider } from './contexts/GlobalContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
  </GlobalContextProvider>
)

import { createBrowserRouter } from "react-router-dom"; 
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";



const router = createBrowserRouter([
    {path: "/", element: <Login />},
    {path: "/Cadastro", element: <Cadastro />},
    {path: "/Perfil", element: <Perfil />},
    {path: "/Home", element: <Home />}
])

export default router
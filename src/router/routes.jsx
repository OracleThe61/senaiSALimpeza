import { createBrowserRouter } from "react-router-dom"; 
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";



const router = createBrowserRouter([
    {path: "/Login", element: <Login />},
    {path: "/Cadastro", element: <Cadastro />},
    {path: "/Perfil", element: <Perfil />},
    {path: "/", element: <Home />}
])

export default router
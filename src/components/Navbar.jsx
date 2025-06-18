import { Link } from "react-router-dom"
import './Navbar.css'
import Botao_logout from './Botao_logout.jsx'

function Navbar() {
  return (
    <nav className="navbar">
        <Link to="/">Login</Link>
        <Link to="/Cadastro">Cadastro</Link>
        <Link to="/Perfil">Perfil</Link>
        <Link to="/Home">Home</Link>
        <Botao_logout />
    </nav>
  )
}

export default Navbar
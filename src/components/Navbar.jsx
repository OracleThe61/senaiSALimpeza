import { Link } from "react-router-dom"
import './Navbar.css'
import Botao_logout from './Botao_logout.jsx'
import Botao_login from "./Botao_login.jsx"
import Botao_cadastro from "./Botao_cadastro.jsx"
import { useContext } from 'react'
import { GlobalContext } from "../contexts/GlobalContext"

function Navbar() {

  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext)

  return (
    <nav className="navbar">
      <Link to="/Perfil">Perfil</Link>
      <Link to="/">Home</Link>

      {usuarioLogado ? (
        <Botao_logout />

      ) :
        (
          <>
            <Botao_login />
            <Botao_cadastro />
          </>
        )}
    </nav>
  )
}

export default Navbar
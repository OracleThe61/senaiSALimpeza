import { Link } from "react-router-dom"
import './Navbar.css'
import Botao_logout from './Botao_logout.jsx'
import Botao_login from "./Botao_login.jsx"
import Botao_cadastro from "./Botao_cadastro.jsx"
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../contexts/GlobalContext"
import axios from 'axios';
import UserIcon from '../assets/icons/user-icon.svg';

function Navbar() {
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext)
  const [fotoPerfil, setfotoPerfil] = useState(null)
   const navigate = useNavigate()

  const defaultAvatar = UserIcon;

  const fetchfotosPerfil = async () => {
    if (!usuarioLogado || !usuarioLogado.id) return;

    try {
      const response = await axios.get('http://localhost:3000/foto_perfil');
      const todasAsFotos = response.data;
      const fotoDoUsuario = todasAsFotos.find(foto => foto.usuarios_id === usuarioLogado.id);

      if (fotoDoUsuario) {
        setfotoPerfil(fotoDoUsuario);

      } else {
        setfotoPerfil(null);
      }

    } catch (error) {
      console.error('Erro ao buscar Foto:', error);
    }
  };

  useEffect(() => {
    fetchfotosPerfil();
  }, []);

  return (
    <div className="container_navbar">
      <nav className="navbar">
        <div>
          <Link to="/">Home</Link>
        </div>


        <div className="opcoes_perfil">
          {usuarioLogado ? (
            <Botao_logout />

          ) :
            (
              <>
                <Botao_login />
                <Botao_cadastro />
              </>
            )}
          {usuarioLogado ? (
            <div className="container_perfil">
              <img className="inconePerfil"  src={fotoPerfil ? fotoPerfil.foto : defaultAvatar} alt="Avatar do Perfil" />
              <Link to="/Perfil">Perfil</Link>
            </div>
          ) : (
            <label htmlFor=""></label>
          )}


        </div>


      </nav>

    </div>
  )
}

export default Navbar
import React, { useContext, useEffect, useState } from 'react'
import './Perfil.css'
import { GlobalContext } from "../contexts/GlobalContext"
import Navbar from "../components/Navbar"
import DetalheCliente from '../components/DetalheCliente'
import DetalhePrestadorSv from '../components/DetalhePrestadorSv'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function Perfil() {
  const [perfil, setPerfil] = useState('')
  const [pagina, setPagina] = useState('')
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext)
  const navigate = useNavigate()

  useEffect(() => {
  if (!usuarioLogado) {
    toast.warning("Você precisa estar logado.");
    navigate("/");
  } else {
    tipoUsuario();
  }
}, [usuarioLogado]);

  function tipoUsuario() {
  
    if (usuarioLogado?.tipo_conta == "Prestador/a de Serviço") {
      setPagina(
        <DetalhePrestadorSv
          key={usuarioLogado?.id}
          nome={usuarioLogado?.nome}
          email={usuarioLogado?.emailLo}
          contato={usuarioLogado?.contato}
          estado={usuarioLogado?.estado}
          cidade={usuarioLogado?.cidade}
          cargaHoraria={usuarioLogado?.vargaHoraria}
          valorServico={usuarioLogado?.valorServico}
          tipo_conta={usuarioLogado?.tipo_conta}

        />
      )
    } else if (usuarioLogado?.tipo_conta == "Cliente") {
      setPagina(
        <DetalheCliente
          key={usuarioLogado?.id}
          nome={usuarioLogado?.nome}
          email={usuarioLogado?.emailLo}
          contato={usuarioLogado?.contato}
          estado={usuarioLogado?.estado}
          cidade={usuarioLogado?.cidade}
          tipo_conta={usuarioLogado?.tipo_conta}
        />

      )
    }
  }

  return (
    <div className='container-perfil'>
      <Navbar />

      <div className='perfil-dados'>
        <div className='img_perfil'>
          <img id='img-perfil' src="/icons/testavatar.png" />

        </div>

        <div>
          <h1 id='nome'>{usuarioLogado?.nome}</h1>
          <h1>Email: {usuarioLogado?.emailLo}</h1>
          <h1>Contato: {usuarioLogado?.contato}</h1>
          <h1>Estado: {usuarioLogado?.estado}</h1>
          <h1>Cidade: {usuarioLogado?.cidade}</h1>

        </div>

      </div>


      <div className='detalhes_perfil'>

        <div className='dados_user'>

          <h1>Deatlhes do Usuario</h1>

          {pagina}

        </div>

      </div>

      {perfil}




    </div>




  )
}

export default Perfil
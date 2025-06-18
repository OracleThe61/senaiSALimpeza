import React, { useContext, useEffect, useState } from 'react'
import './Perfil.css'
import { GlobalContext } from "../contexts/GlobalContext"
import Navbar from "../components/Navbar"
import DetalheCliente from '../components/DetalheCliente'
import DetalhePrestadorSv from '../components/DetalhePrestadorSv'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function Perfil() {
  const [perfil, setPerfil] = useState('')
  const [pagina, setPagina] = useState('')
  const [usuarios, setUsuarios] = useState([]);
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext)
  const navigate = useNavigate()

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]);

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
          cep={usuarioLogado?.cep}
          estado={usuarioLogado?.estado}
          cidade={usuarioLogado?.cidade}
          rua={usuarioLogado?.rua}
          CargaHorariaInicio={usuarioLogado?.cargaHoraria_max}
          CargaHorariaFim={usuarioLogado?.cargaHoraria_min}
          max={usuarioLogado?.valorServico_max}
          valorServico_min={usuarioLogado?.valorServico_min}
          tipo_conta={usuarioLogado?.tipo_conta}
          descricao={usuarioLogado?.descricao}
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
          descricao={usuarioLogado?.descricao}
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

        <div>

          <h1 id='dados_user'>Deatlhes do Usuario</h1>

          {pagina}

        </div>

      </div>

      {perfil}




    </div>




  )
}

export default Perfil
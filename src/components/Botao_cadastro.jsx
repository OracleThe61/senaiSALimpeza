import React from 'react'
import { useNavigate } from 'react-router-dom';
import './botao_cadastro.css' 

function Botao_cadastro() {
  const navigate = useNavigate()
  
      const irPgCadastro = () => {
          navigate("/Cadastro")
  
      };
  
      return (
          <div onClick={irPgCadastro} className='bnt_cadastro'>Cadastro</div>
      )
}

export default Botao_cadastro
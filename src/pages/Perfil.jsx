import React from 'react'
import './Perfil.css'

function Perfil() {
  return (
    <div className='container-perfil'>
      <div className='perfil-dados'>
        <div className='img_perfil'>
          <img id='img-perfil' src="/icons/testavatar.png" />

        </div>
        
        <h1 id='nome'>Nome do Usuário</h1>
        <h1>Profissão em Lugar</h1>
        <h1>De RS$ a R$</h1>
        <h1>Trabalha das XX:XX às YY:YY</h1>
        <h1>Contato: ABCDEFGHIJKL</h1>
      </div>

      <div className='detalhes_perfil'>
        <h1>Deatlhes do Usuario</h1>
        <p>Nome:</p>
        <p>Email:</p>
        <p>Contato:</p>
        <p>Estado:</p>
        <p>Cidade:</p>
      </div>


    </div>




  )
}

export default Perfil
import React from 'react'
import './Perfil.css'

function Perfil() {
  return (
    <div className='container-perfil'>
        <div className='img-perfil'>
            <img src="/icons/testavatar.png"/>
        </div>
        <div className='perfil-dados'>
            <h1 id='nome'>Nome do Usuário</h1>
            <h1>Profissão em Lugar</h1>
            <h1>De RS$ a R$</h1>
            <h1>Trabalha das XX:XX às YY:YY</h1>
            <h1>Contato: ABCDEFGHIJKL</h1>
        </div>
        
    </div>
  )
}

export default Perfil
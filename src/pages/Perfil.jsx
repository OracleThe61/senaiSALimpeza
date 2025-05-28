import React, { useState } from 'react'
import './Perfil.css'
import DetalheUser from './DetalheUser'



function Perfil() {
  const [perfil, setPerfil] = useState('')
  const [usuarioLo, setUsuarioLo] = useState([{
    id: 123,
    nome: "Bianca",
    email: "bia@gmail.com",
    contato: '0000000',
    estado : 'Floripa',
    cidade : 'Floripasssssssss',
    senha: 123
  }])

  // function TratarPerfil(){
  //   if(perfil == ''){
  //     setPerfil(<p> </p>)
  //   }else{
  //     setPerfil('')
  //   }
  // }





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

      <h1 className='titulo'>Deatlhes do Usuario</h1>

      <div className='detalhes_perfil'>

        {usuarioLo.map((p) => (
          <DetalheUser key={p.id} nome={p.nome} email={p.email} contato={p.contato} estado={p.estado} cidade={p.cidade}/>
        ))}

      </div>

      {perfil}




    </div>




  )
}

export default Perfil
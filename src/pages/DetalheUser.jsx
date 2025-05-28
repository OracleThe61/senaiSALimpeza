import React from 'react'

function DetalheUser(info) {
    return (
        <div className='container-produto'>
            <p>Nome: {info.nome}</p>
            <p>Email: {info.email}</p>
            <p>Contato: {info.contato}</p>
            <p>Estado: {info.estado}</p>
            <p>Cidade: {info.cidade}</p>
            <p>{info.id}</p>
            
        </div>
    )
}

export default DetalheUser
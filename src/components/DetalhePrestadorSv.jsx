import React from 'react'


function DetalhePrestadorSv(info) {
    return (
        <div className='container-produto'>
            <p>Nome: {info.nome}</p>
            <p>Email: {info.email}</p>
            <p>Contato: {info.contato}</p>
            <p>Estado: {info.estado}</p>
            <p>Cidade: {info.cidade}</p>
            <p>Carga Horaria: {info.CargaHoraria} </p>
            <p>Valor do Serviço: {info.valorServico}</p>
            <p>Tipo Conta: {info.tipo_conta}</p>
            <p>{info.id}</p>
            
        </div>
    )
}

export default DetalhePrestadorSv
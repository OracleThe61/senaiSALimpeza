import React from 'react'


function DetalhePrestadorSv(info) {
    return (
        <div className='container-produto'>
            <p>Nome: {info.nome}</p>
            <p>Email: {info.email}</p>
            <p>Contato: {info.contato}</p>
            <p>Cep: {info.cep}</p>
            <p>Estado: {info.estado}</p>
            <p>Cidade: {info.cidade}</p>
            <p>Rua: {info.rua}</p>
            <p>Carga Horaria Inicio: {info.CargaHorariaInicio} </p>
            <p>Carga Horaria Fim: {info.CargaHorariaFim}</p>
            <p>Valor do Serviço maximo: {info.valorServico_max}</p>
            <p>Valor do Serviço Minimo: {info.valorServico_min}</p>
            <p>Tipo Conta: {info.tipo_conta}</p>
            <p>Descrição: {info.descricao}</p>
            <p>{info.id}</p>
            
        </div>
    )
}

export default DetalhePrestadorSv
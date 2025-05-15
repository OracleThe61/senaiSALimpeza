import React, { useState, useEffect  } from 'react'
import './Cadastro.css'

function Cadastro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [vaSenha, setVaSenha] = useState('')
    const [tipoConta, setTipoConta] = useState('Cliente')
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => console.log(tipoConta), [tipoConta])

    useEffect(() => console.log(usuarios), [usuarios])

    function cadastro() {
        if (!email || !senha || !vaSenha) {
            alert("Preencha todos os campos")
        } else if (senha != vaSenha) {
            alert("A Senhas não conferem")
        } else{
            const novoUsuario = {
                id: Date.now(),
                email: email,
                senha: senha,
                tipo_conta: tipoConta
            }

            setUsuarios([novoUsuario, ...usuarios])

            setEmail('')
            setSenha('')
            setVaSenha('')
        }




    }

    // useEffect(() => {console.log(usuarios), [usuarios]})


    return (
        <div className='container-cadastro'>
            <div>
                <h1>Cadastro</h1>
            </div>

            <div className='inputs-cadastro'>

                <label htmlFor="input-email" className='label-emailCad'>Email</label>
                <input type="text" className='input-email' value={email} onChange={(event) => setEmail(event.target.value)} />

                <label htmlFor="input-senha" className='label-senhaCad'>Senha</label>
                <input type="password" className='input-senha' value={senha} onChange={(event) => setSenha(event.target.value)} />

                <label htmlFor="input-coSenha" className='label-coSenhaCad'>Confirmar Senha</label>
                <input type="password" className='input-coSenha' value={vaSenha} onChange={(event) => setVaSenha(event.target.value)} />

            </div>


            <div className='inputs-tipo-conta'>
                <div className='input-tipo-prestadorSe'>
                    <input type="radio" id='prestador-servico' className='prestador-servico' value='prestador-servico' onChange={(event) => setTipoConta(event.target.value)} name='escolha' checked={tipoConta === 'prestador-servico'} />
                    <label htmlFor="prestador-servico">Prestador/a de Serviço</label>
                </div>

                <div className='input-tipo-cliente'>
                    <input type="radio" id='cliente' className='cliente' name='escolha' value='cliente' onChange={(event) => setTipoConta(event.target.value)} checked={tipoConta === 'cliente'} />
                    <label htmlFor="cliente">Cliente</label>
                </div>


            </div>

            <div>
                <button onClick={cadastro} className='botao-cadastro'>Cadastrar</button>
            </div>

        </div>
    )
}

export default Cadastro
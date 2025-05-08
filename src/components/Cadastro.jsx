import React, { useState } from 'react'
import './Cadastro.css'

function Cadastro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [vaSenha, setVaSenha] = useState('')
    const [usuarios, setUsuarios] = useState([])

    function cadastro() {
        if (!email || !senha || !vaSenha) {
            alert("Preencha todos os campos")
        }else if(senha != vaSenha) {
            alert("A Senhas não conferem")
        }else {
            const novoUsuario = {
                id: Date.now(),
                email: email,
                senha: senha
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

            <label htmlFor="input-email">Email</label>
            <input type="text" className='input-email'  value={email} onChange={(event) => setEmail(event.target.value)}/>

            <label htmlFor="input-senha">Senha</label>
            <input type="password" className='input-senha'  value={senha} onChange={(event) => setSenha(event.target.value)}/>

            <label htmlFor="input-coSenha">Confirmar Senha</label>
            <input type="password" className='input-coSenha'  value={vaSenha} onChange={(event) => setVaSenha(event.target.value)}/>
        </div>

        <div>
            <button onClick={cadastro} className='butao-cadastro'>Cadastrar</button>
        </div>

    </div>
  )
}

export default Cadastro
import React, { useState } from 'react'

import './Login.css'

function Login() {
    const [emailLogin, setEmailLogin] = useState('')
    const [senhaLogin, setSenhaLogin] = useState('')
    const [usuarioLogado, setUsuarioLogado] = useState([])


    //CODIGO A FAZER CONTINUAR DEPOIS, SOMENTE PROFICIOANIS (ERIC ANAL FABETA).

    // function login() {
    //     if (!email || !senha ) {
    //         alert("Preencha todos os campos")
    //     }else if(senha != /*continuar*/ ) {
    //         alert("A Senhas não conferem")
    //     }else {
    //         const usuarioLo = {
    //             id: Date.now(),
    //             emailLo: email,
    //             senhaLo: senha
    //         }

    //         setUsuarioLogado([usuarioLo, ...usuarioLogado])

    //         setEmail('')
    //         setSenha('')
            
    //     }


    // }



  return (
    <div className='container-cadastro'>
        <div>
            <h1>Cadastro</h1>
        </div>

        <div>
            <input type="text" value={emailLogin} onChange={(event) => setEmailLogin(event.target.value)}/>
            <input type="password" value={senhaLogin} onChange={(event) => setSenhaLogin(event.target.value)}/>
        </div>

        <div>
            <button onClick={login}>Cadastrar</button>
        </div>

    </div>
  )
}

export default Login
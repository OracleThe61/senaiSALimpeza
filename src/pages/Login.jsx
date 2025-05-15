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
        <div className='container-login'>
            <div>
                <h1>Login</h1>
            </div>

            <div className='inputs-login'>
                <label htmlFor="input-emailLo" className='label-emailLo'>Email</label>
                <input type="text" className='input-emailLo' value={emailLogin} onChange={(event) => setEmailLogin(event.target.value)} />

                <label htmlFor="input-senhaLo" className='label-senhaLo'>Senha</label>
                <input type="password" className='input-senhaLo' value={senhaLogin} onChange={(event) => setSenhaLogin(event.target.value)} />


            </div>

            
            <div>
                <button className='botao-login'>Cadastrar</button>
            </div>

        </div>
    )
}

export default Login
import React, { useState } from 'react'

import './Login.css'

function Login() {
    const [emailLogin, setEmailLogin] = useState('')
    const [senhaLogin, setSenhaLogin] = useState('')
    const [usuarioLogado, setUsuarioLogado] = useState([])

    const [usuarioCadastrado, setUsuarioCadastrado] = useState([{
        id:123,
        nome: "Bianca",
        email: "bia@gmail.com",
        senha: 123
    },{
        id:123,
        nome: "Carlos",
        email: "carlos@gmail.com",
        senha: 321
    },{
        id:123,
        nome: "João",
        email: "joao@gmail.com",
        senha: 213
    },{
        id:123,
        nome: "paulo",
        email: "paulo@gmail.com",
        senha: 312
    },])

    //CODIGO A FAZER CONTINUAR DEPOIS, SOMENTE PROFICIOANIS (ERIC ANAL FABETA).


    function login() {
        let emailCad = usuarioCadastrado.find(({email}) => email === emailLogin)
        let senhaCad = usuarioCadastrado.find(({senha}) => senha === senhaLogin)
        
        console.log(usuarioCadastrado)
       
        if (!emailLogin || !senhaLogin ) {
            alert("Preencha todos os campos")
        }else if(emailCad.includes(emailLogin) != true ) {
            alert("Email não existente")
        }else if(senhaCad.includes(senhaLogin) != true ) {
            alert("A Senhas não conferem")
        }else if(emailCad.includes(emailLogin) == true && senhaCad.includes(senhaLogin) == true){
            let usuarioLo = {
                id: Date.now(),
                emailLo: emailLogin,
                senhaLo: senhaLogin
            }

            setUsuarioLogado([usuarioLo, ...usuarioLogado])

            setEmailLogin('')
            setSenhaLogin('')
            
            alert("Login efetuado ")
        }


    }



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
                <button className='botao-login' onClick={login}>Cadastrar</button>
            </div>

        </div>
    )
}

export default Login
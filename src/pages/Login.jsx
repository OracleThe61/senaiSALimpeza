import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'

function Login() {
    const [emailLogin, setEmailLogin] = useState('')
    const [senhaLogin, setSenhaLogin] = useState('')
    // const [usuarioLogado, setUsuarioLogado] = useState([])

    const [usuarioCadastrado, setUsuarioCadastrado] = useState([{
        id: 123,
        nome: "Bianca",
        email: "bia@gmail.com",
        senha: 123
    }, {
        id: 123,
        nome: "Carlos",
        email: "carlos@gmail.com",
        senha: 321
    }, {
        id: 123,
        nome: "João",
        email: "joao@gmail.com",
        senha: 213
    }, {
        id: 123,
        nome: "paulo",
        email: "paulo@gmail.com",
        senha: 312
    },])

    function login() {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        let emailCad = usuarioCadastrado.find(usuario => usuario.email === emailLogin)

        console.log(usuarioCadastrado)
        console.log(usuario)

        if (!emailLogin || !senhaLogin) {
            toast.error("Preencha todos os campos corretamente");
        } else if (!emailCad) {
            toast.warning("Email inexistente");

        } else if (senhaLogin != emailCad.senha) {
            toast.error("A Senhas não conferem");

        } else if (usuario) {
            toast.warning("Você já está logado em uma conta");

        }
        else if (emailCad) {

            let usuarioLo = {
                id: Date.now(),
                emailLo: emailLogin,
                senhaLo: senhaLogin,
                logado: true
            }


            setEmailLogin('')
            setSenhaLogin('')

            toast.success("Login efetuado com sucesso");
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLo));
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

                <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false} pauseOnFocusLoss={false} draggable={true} />
            </div>


            <div>
                <button className='botao-login' onClick={login}>Cadastrar</button>
            </div>

        </div>
    )
}

export default Login
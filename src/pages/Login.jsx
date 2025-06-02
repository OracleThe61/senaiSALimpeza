import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { GlobalContext } from "../contexts/GlobalContext"
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const {usuarioLogado, setUsuarioLogado} = useContext(GlobalContext)
    const {usuarioCadastrado, setUsuarioCadastrado} = useContext(GlobalContext)
    const [emailLogin, setEmailLogin] = useState('')
    const [senhaLogin, setSenhaLogin] = useState('')
    const navigate = useNavigate()
    

    

    function login() {
        let emailCad = usuarioCadastrado.find(usuario => usuario.email === emailLogin)

        console.log(usuarioLogado)

        if (!emailLogin || !senhaLogin) {
            toast.error("Preencha todos os campos corretamente");
        } else if (!emailCad) {
            toast.warning("Email inexistente");

        } else if (senhaLogin != emailCad.senha) {
            toast.error("A Senhas não conferem");

        } else if (usuarioLogado) {
            toast.warning("Você já está logado em uma conta");

        }
        else if (emailCad) {

            let usuarioLo = {
                id: Date.now(),
                nome: emailCad.nome,
                emailLo: emailLogin,
                tipo_conta: emailCad.tipo_conta,
                logado: true
            }

            console.log(usuarioLogado)
            setEmailLogin('')
            setSenhaLogin('')

            toast.success("Login efetuado com sucesso");
            setUsuarioLogado(usuarioLo)
            navigate('/Perfil')
            navigator
        }


    }



    return (
        <div className='container-login'>
             <Navbar />

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
                <button className='botao-login' onClick={login}>Logar</button>
            </div>

        </div>
    )
}

export default Login
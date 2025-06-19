import React, { useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { GlobalContext } from "../contexts/GlobalContext"
import Navbar from "../components/Navbar"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const {usuarioLogado, setUsuarioLogado} = useContext(GlobalContext)
    const [usuarios, setUsuarios] = useState([])
    const [emailLogin, setEmailLogin] = useState('')
    const [senhaLogin, setSenhaLogin] = useState('')
    const navigate = useNavigate()
    
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    function login() {
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailLogin)

        console.log(usuarioLogado)

        if (!emailLogin || !senhaLogin) {
            toast.error("Preencha todos os campos corretamente");
        } else if (!usuarioEncontrado) {
            toast.warning("Email inexistente");
        } else if (senhaLogin != usuarioEncontrado.senha) {
            toast.error("A Senhas não conferem");

        } else if (usuarioLogado) {
            toast.warning("Você já está logado em uma conta");

        }
        else if (usuarioEncontrado) {

            let usuarioLo = {
                id: Date.now(),
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                tipo_conta: usuarioEncontrado.tipo_conta,
                contato: usuarioEncontrado.contato,
                cep: usuarioEncontrado.cep,
                estado: usuarioEncontrado.estado,
                cidade: usuarioEncontrado.cidade,
                rua: usuarioEncontrado.rua,
                valor_min: usuarioEncontrado.valor_min,
                valor_max: usuarioEncontrado.valor_max,
                cargaHoraria_inicio: usuarioEncontrado.cargaHoraria_inicio,
                cargaHoraria_fim: usuarioEncontrado.cargaHoraria_fim,
                descricao: usuarioEncontrado.descricao
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
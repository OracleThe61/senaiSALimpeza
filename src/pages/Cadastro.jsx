import React, { useState, useEffect } from 'react'
import './Cadastro.css'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [vaSenha, setVaSenha] = useState('')
    const [tipoConta, setTipoConta] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate();

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

    useEffect(() => {
        console.log(usuarios);
    }, [usuarios]);


    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
        return regex.test(email);
    };

    const cadastro = async () => {
        try {
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);

            if (!nome || !email || !senha || !vaSenha || !validarEmail(email)) {
                return toast.error("Preencha todos os campos corretamente");

            } else if (usuarioEncontrado) {
                return toast.warning("Usuario Ja Cadastrado");
            } else if (senha != vaSenha) {
                return toast.error("A Senhas não conferem");
            } else {
                const usuario = {
                    nome: nome,
                    email: email,
                    senha: senha,
                    tipo_conta: tipoConta
                }

                const response = await axios.post('http://localhost:3000/usuarios', usuario);
                if (response.status === 201) {
                    fetchUsuarios();
                    limparForm();
                    toast.success("Cadastro efetuado com sucesso");
                    navigate('/')
                }
            }
        } catch (error) {
            console.error('Erro ao adicionar usuarios:', error);
        }
    };

    function limparForm() {
        setEmail('')
        setSenha('')
        setVaSenha('')
        setNome('')
    }

    // function cadastro() {
    //     const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);

    //     if (!nome || !email || !senha || !vaSenha || !validarEmail(email)) {
    //         toast.error("Preencha todos os campos corretamente");
    //     } else if (usuarioEncontrado) {
    //         toast.warning("Usuario Ja Cadastrado");
    //     } else if (senha != vaSenha) {
    //         toast.error("A Senhas não conferem");
    //     } else {
    //         const novoUsuario = {
    //             id: Date.now(),
    //             nome: nome,
    //             email: email,
    //             senha: senha,
    //             tipo_conta: tipoConta
    //         }

    //         toast.success("Cadastro efetuado com sucesso");
    //         setUsuarios([novoUsuario, ...usuarios])
    //         navigate('/')

    //         setEmail('')
    //         setSenha('')
    //         setVaSenha('')
    //         setNome('')
    //     }


    // }


    return (
        <div className='container-cadastro'>
            <div className='navbar_lo'>
                <Navbar />
            </div>


            <div>
                <h1>Cadastro</h1>
            </div>

            <div className='inputs-cadastro'>

                <label htmlFor="input-email" className='label-emailCad'>Nome</label>
                <input type="text" className='input-email' value={nome} onChange={(event) => setNome(event.target.value)} />

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

                <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false} pauseOnFocusLoss={false} draggable={true} />

            </div>

            <div>
                <button onClick={cadastro} className='botao-cadastro'>Cadastrar</button>
            </div>

        </div>
    )
}

export default Cadastro
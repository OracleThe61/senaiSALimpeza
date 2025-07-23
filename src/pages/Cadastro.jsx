import React, { useState, useEffect } from 'react'
import './Cadastro.css'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { validarEmail } from '../components/Formarter';
import { Route, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [vaSenha, setVaSenha] = useState('')
    const [tipoConta, setTipoConta] = useState('Cliente')
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


    const cadastro = async () => {
        try {
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);

            if (!nome || !email || !senha || !vaSenha || !validarEmail(email)) {
                toast.error("Preencha todos os campos corretamente");
            } else if (usuarioEncontrado) {
                toast.warning("Usuario Ja Cadastrado");
            } else if (senha != vaSenha) {
                toast.error("A Senhas não conferem");
            } else {

                const usuario = {
                    nome: nome,
                    email: email,
                    senha: senha,
                    tipo_conta: tipoConta
                }
                toast.success("Cadastro efetuado com sucesso");

                const response = await axios.post('http://localhost:3000/usuarios', usuario);
                if (response.status === 201) {

                    fetchUsuarios();
                    limparForm();
                    setTimeout(() => {
                        navigate('/Login');
                    }, 800);
                }

            }

        } catch (error) {
            console.error('Erro ao adicionar usuarios:', error);
        }
    }

    function limparForm() {
        setEmail('')
        setSenha('')
        setVaSenha('')
        setNome('')
    }

    return (
        <div className='container-cadastro'>
            <Navbar />

            <div>
                <h1 className='titulo_cadastro'>Cadastro</h1>
            </div>

            <div className='container_conteudos_cadastro'>
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
                    <div className='input-tipo-cliente'>
                        <input type="radio" id='cliente' className='cliente' name='escolha' value='Cliente' onChange={(event) => setTipoConta(event.target.value)} checked={tipoConta === 'Cliente'} />
                        <label htmlFor="cliente">Cliente</label>
                    </div>

                    <div className='input-tipo-prestadorSe'>
                        <input type="radio" id='prestador-servico' className='prestador-servico' value='Prestador/a de Serviço' onChange={(event) => setTipoConta(event.target.value)} name='escolha' checked={tipoConta === 'Prestador/a de Serviço'} />
                        <label htmlFor="prestador-servico">Prestador/a de Serviço</label>
                    </div>


                </div>


                <div className='irPg_Login'>
                    <label onClick={() => navigate('/Login')}>Já tem uma conta?</label>
                </div>

                <div className='container_bnt_cadastro'>
                    <button onClick={cadastro} className='botao-cadastro'>Cadastrar</button>
                </div>
            </div>

        </div>
    )
}

export default Cadastro
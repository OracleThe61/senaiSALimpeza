import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar"
import './Home.css'
import { ToastContainer, toast } from 'react-toastify';
import { formatPhoneNumber, formatCepNumber, formatTime } from '../components/Formarter';
import { GlobalContext } from '../contexts/GlobalContext';
import Aviso from '../components/Aviso';
import UserIcon from '../assets/icons/user-icon.svg';


function Home() {

    const [usuarios, setUsuarios] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);
    const [mostrarAviso, setMostrarAviso] = useState(false);
    const [fotoPerfil, setfotoPerfil] = useState({});
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const defaultAvatar = UserIcon;


    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);


    const fetchfotosPerfil = async () => {
        try {
            const response = await axios.get('http://localhost:3000/foto_perfil');
            const todasAsFotos = response.data;


            const fotosMap = {}
            todasAsFotos.forEach(foto => {
                fotosMap[foto.usuarios_id] = foto.foto

            })
            setfotoPerfil(fotosMap);

        } catch (error) {
            console.error('Erro ao buscar Foto:', error);
        }
    };

    useEffect(() => {
        fetchfotosPerfil();
    }, []);

    useEffect(() => {
        if (usuarioLogado && usuarioLogado.tipo_conta === 'Prestador/a de Serviço') {
            const { cargaHoraria_inicio, cargaHoraria_fim, valor_min, valor_max, cep, estado, cidade, rua, contato } = usuarioLogado;

            const informacoesIncompletas =
                !cargaHoraria_inicio ||
                !cargaHoraria_fim ||
                !valor_min ||
                !valor_max ||
                !cep ||
                estado == '' ||
                cidade == '' ||
                rua == '' ||
                !contato;

            setMostrarAviso(informacoesIncompletas);
        } else if (!usuarioLogado) {
            setMostrarAviso(false);
        }
    }, [usuarioLogado]);


    useEffect(() => {
        setSelectedCard(null);
    }, [searchTerm, paginaAtual]);

    useEffect(() => {
        setPaginaAtual(1);
    }, [searchTerm, itensPorPagina]);


    const Card = ({ data, onClick, isSelected, fotoUrl }) => {
        return (
            <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
                <div className='elementos-card'>
                    <img className="fotoUserHome" src={fotoUrl} alt="Avatar do Perfil" />
                    <div className='basic_info'>
                        <h2>{data.nome}</h2>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Localização:</strong> {data.cidade} | {data.estado}</p>
                        <p><strong>Horário:</strong> {formatTime(data.cargaHoraria_inicio)} - {formatTime(data.cargaHoraria_fim)}</p>
                        <div className='contianer-valorServico'>
                            <p className="price-button"><strong>R$ {data.valor_min} - R$ {data.valor_max}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const usuariosVisiveis = usuarios.filter(user => {
        if (user.tipo_conta !== 'Prestador/a de Serviço') return false;

        const informacoesCompletas =
            user.cargaHoraria_inicio &&
            user.cargaHoraria_fim &&
            user.valor_min &&
            user.valor_max &&
            user.cep &&
            user.estado &&
            user.cidade &&
            user.rua &&
            user.contato;
        if (!informacoesCompletas && !(usuarioLogado && usuarioLogado.id === user.id)) {
            return false;
        }

        const termo = searchTerm.toLowerCase();
        if (termo === '') return true;

        return (
            user.nome?.toLowerCase().includes(termo) ||
            user.cidade?.toLowerCase().includes(termo) ||
            user.estado?.toLowerCase().includes(termo) ||
            user.rua?.toLowerCase().includes(termo)
        );
    });

    const handleCardClick = (user) => {
        setSelectedCard(user);
    };


    const totalDePaginas = Math.ceil(usuariosVisiveis.length / itensPorPagina);
    const ultimoItemIndex = paginaAtual * itensPorPagina;
    const primeiroItemIndex = ultimoItemIndex - itensPorPagina;
    const usuariosDaPagina = usuariosVisiveis.slice(primeiroItemIndex, ultimoItemIndex);


    return (
        <div className="container_home">
            <Navbar className='navbar' />

            {usuarioLogado && mostrarAviso && (
                <div className='aviso'>
                    <Aviso />
                </div>
            )}

            <div className='corpo_home'>
                <div className='conteudo_topo'>
                    <div className='input_pesquisa'>
                        <input
                            type="text"
                            placeholder="Buscar por nome, cidade ou estado"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-bar"
                        />
                    </div>

                    <div className='qnt_itensPaginacao'>
                        <label className='msgIdicativa'>Exibir por:</label>

                        {[10, 15, 20, 25, 30].map(qnt => (
                            <button
                                key={qnt}
                                className={`bnt_qntItensPagina ${itensPorPagina === qnt ? 'active' : ''}`}
                                onClick={() => setItensPorPagina(qnt)}
                            >
                                {qnt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="main-content">

                    <div className="card-list">
                        {usuariosDaPagina.map((user) => {
                            const fotoUsuario = fotoPerfil[user.id_usuario] || defaultAvatar;
                            return (<Card
                                key={user.id}
                                data={user}
                                onClick={() => handleCardClick(user)}
                                isSelected={selectedCard === user}
                                fotoUrl={fotoUsuario}
                            />)
                        })}
                    </div>

                    {selectedCard && (() => {
                        const fotoUrl = fotoPerfil[selectedCard.id_usuario] || defaultAvatar;

                        return (

                            <div className='detalhe_usuarios'>
                                <div className="card-details">
                                    <div className='detalhes-topo'>
                                        <img className="fotoUserdetalhes" src={fotoUrl} alt="Avatar do Perfil" />
                                        <div className='infos-topo'>
                                            <p className='nome-detalhes'><strong>{selectedCard.nome}</strong></p>
                                            <p><strong>Email:</strong> {selectedCard.email}</p>
                                            <p><strong>Contato:</strong> {formatPhoneNumber(selectedCard.contato)}</p>

                                        </div>
                                    </div>

                                    <div className='detalhes-bottom'>

                                        <p><strong>CEP:</strong> {formatCepNumber(selectedCard.cep)}</p>
                                        <p><strong>Localização:</strong> {selectedCard.cidade}, {selectedCard.estado}</p>
                                        <p><strong>Rua:</strong> {selectedCard.rua}</p>
                                        <p><strong>Horário:</strong>{formatTime(selectedCard.cargaHoraria_inicio)} - {formatTime(selectedCard.cargaHoraria_fim)}</p>
                                        <p><strong>Faixa de Preço:</strong> R$ {selectedCard.valor_min} - R$ {selectedCard.valor_max}</p>
                                        <p><strong>Descrição:</strong> {selectedCard.descricao}</p>
                                    </div>
                                </div>


                            </div>

                        )
                    })()}

                </div>

                <div className='conteudo_bottom'>
                    <div className="controle_paginacao">
                        <button
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalDePaginas }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setPaginaAtual(index + 1)}
                                className={paginaAtual === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPaginaAtual(paginaAtual + 1)}
                            disabled={paginaAtual === totalDePaginas}
                        >
                            Próxima
                        </button>
                    </div>
                </div>

            </div>

    

        </div>
    );

}

export default Home
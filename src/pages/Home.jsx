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


    const Card = ({ data, onClick, isSelected, fotoUrl }) => {
        if (data.tipo_conta === 'Prestador/a de Serviço') {
            const informacoesCompletas =
                data.cargaHoraria_inicio &&
                data.cargaHoraria_fim &&
                data.valor_min &&
                data.valor_max &&
                data.cep &&
                data.estado != '' &&
                data.cidade != '' &&
                data.rua != '' &&
                data.contato;

            if (!informacoesCompletas && !(usuarioLogado && usuarioLogado.id === data.id)) {
                return null;
            }


            return (
                <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
                    <div className='elementos-card'>

                        <img className="fotoUserHome" src={fotoUrl} alt="Avatar do Perfil" />

                        <div className='basic_info'>
                            <h2>{data.nome}</h2>
                            <p><strong>Email:</strong> {data.email}</p>
                            <p><strong>Localização:</strong> {data.cidade} | {data.estado}</p>
                            <p><strong>Horario:</strong> {formatTime(data.cargaHoraria_inicio)} - {formatTime(data.cargaHoraria_fim)}</p>

                            <div className='contianer-valorServico'>
                                <p className="price-button"><strong>R$ {data.valor_min} - R$ {data.valor_max}</strong></p>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };



    const handleCardClick = (index) => {
        setSelectedCard(filteredCards[index]);
    };

    const filteredCards = usuarios.filter((user) =>
        user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.estado?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rua?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container_home">
            <Navbar className='navbar' />

            {usuarioLogado && mostrarAviso && (
                <div className='aviso'>
                    <Aviso />
                </div>
            )}

            <div className='corpo_home'>
                <div className='input_pesquisa'>
                    <input
                        type="text"
                        placeholder="Buscar por nome, cidade ou estado"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>

                <div className="main-content">

                    <div className="card-list">
                        {filteredCards.map((user, index) => {
                            const fotoUsuario = fotoPerfil[user.id_usuario] || defaultAvatar;

                            return (<Card
                                key={user.id}
                                data={user}
                                onClick={() => handleCardClick(index)}
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

            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />

        </div>
    );

}

export default Home
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar"
import './Home.css'
import { ToastContainer, toast } from 'react-toastify';
import { formatPhoneNumber, formatCepNumber, formatTime } from '../components/Formarter';
import { GlobalContext } from '../contexts/GlobalContext';
import Aviso from '../components/Aviso';


function Home() {

    const [usuarios, setUsuarios] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);
    const [mostrarAviso, setMostrarAviso] = useState(false)

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

    useEffect(() => {
        if (usuarioLogado && usuarioLogado.tipo_conta === 'Prestador/a de Serviço') {
            const { cargaHoraria_inicio, cargaHoraria_fim, valor_min, valor_max, cep, estado, cidade, rua, contato } = usuarioLogado;

            const informacoesIncompletas =
                !cargaHoraria_inicio ||
                !cargaHoraria_fim ||
                !valor_min ||
                !valor_max ||
                !cep ||
                estado == 'Local Indefinido' || 
                estado == '' ||
                cidade == 'Local Indefinido' || 
                cidade =='' ||
                rua == 'Local Indefinido' || 
                rua == '' ||
                !contato;

            setMostrarAviso(informacoesIncompletas);
        } else if (!usuarioLogado) {
            setMostrarAviso(false);
        }
    }, [usuarioLogado]);

    const Card = ({ data, onClick, isSelected }) => {
        if (data.tipo_conta === 'Prestador/a de Serviço') {
            const informacoesCompletas =
                data.cargaHoraria_inicio &&
                data.cargaHoraria_fim &&
                data.valor_min &&
                data.valor_max &&
                data.cep &&
                data.estado != 'Local Indefinido' &&
                data.estado != '' &&
                data.cidade != 'Local Indefinido' &&
                data.cidade != '' &&
                data.rua != 'Local Indefinido' &&
                data.rua != '' &&
                data.contato;

            if (!informacoesCompletas && !(usuarioLogado && usuarioLogado.id === data.id)) {
                return null;
            }

            return (
                <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
                    <h2>{data.nome}</h2>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Localização:</strong> {data.cidade} | {data.estado}</p>
                    <p><strong>Horario:</strong> {formatTime(data.cargaHoraria_inicio)} - {formatTime(data.cargaHoraria_fim)}</p>
                    <p className="price-button"><strong>R$ {data.valor_min} - R$ {data.valor_max}</strong></p>
                </div>
            );
        }
        // Retorna null para outros tipos de conta que você não quer exibir
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
                        {filteredCards.map((user, index) => (
                            <Card
                                key={user.id}
                                data={user}
                                onClick={() => handleCardClick(index)}
                                isSelected={selectedCard === user}
                            />
                        ))}
                    </div>

                    {selectedCard && (
                        <div className='detalhe_usuarios'>
                            <div className="card-details">
                                <h2>{selectedCard.nome}</h2>
                                <p><strong>Email:</strong> {selectedCard.email}</p>
                                <p><strong>Contato:</strong> {formatPhoneNumber(selectedCard.contato)}</p>
                                <p><strong>CEP:</strong> {formatCepNumber(selectedCard.cep)}</p>
                                <p><strong>Localização:</strong> {selectedCard.cidade}, {selectedCard.estado}</p>
                                <p><strong>Rua:</strong> {selectedCard.rua}</p>
                                <p><strong>Horário:</strong>{formatTime(selectedCard.cargaHoraria_inicio)} - {formatTime(selectedCard.cargaHoraria_fim)}</p>
                                <p><strong>Faixa de Preço:</strong> R$ {selectedCard.valor_min} - R$ {selectedCard.valor_max}</p>
                                <p><strong>Descrição:</strong> {selectedCard.descricao}</p>
                            </div>

                        </div>
                    )}

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
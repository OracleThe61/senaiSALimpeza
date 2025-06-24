import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar"
import './Home.css'
import { ToastContainer, toast } from 'react-toastify';


function Home() {

    const [usuarios, setUsuarios] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const Card = ({ data, onClick, isSelected }) => {
        if (data.tipo_conta === 'Prestador/a de Serviço') {
            return (<div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
                <h2>{data.nome}</h2>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Localização:</strong> {data.cidade} | {data.estado}</p>
                <p><strong>Horario:</strong> {data.cargaHoraria_inicio} - {data.cargaHoraria_fim}</p>
                <p className="price-button"><strong>R$ {data.valor_min} - R$ {data.valor_max}</strong></p>
            </div>)
        }
    }



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
            <Navbar />

            <div className='corpo_home'>
                <div className='input_pesquisa'>
                    <input
                        type="text"
                        placeholder="Buscar por nome, cidade, estado ou tipo..."
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
                                <p><strong>Contato:</strong> {selectedCard.contato}</p>
                                <p><strong>Localização:</strong> {selectedCard.cidade}, {selectedCard.estado}</p>
                                <p><strong>Rua:</strong> {selectedCard.rua}</p>
                                <p><strong>Horário:</strong> {selectedCard.cargaHoraria_inicio} - {selectedCard.cargaHoraria_fim}</p>
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
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );

}

export default Home
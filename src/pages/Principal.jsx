import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar"

const Card = ({ data, onClick, isSelected }) => (
  <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
    <h2>{data.nome}</h2>
    <p>{data.cidade}, {data.estado}</p>
    <p>{data.tipo_conta}</p>
    <p>{data.cargaHoraria_min} - {data.cargaHoraria_max}</p>
    <p>R$ {data.valorServico_min} - R$ {data.valorServico_max}</p>
  </div>
);

const App = () => {
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

  const handleCardClick = (index) => {
    setSelectedCard(filteredCards[index]);
  };

  const filteredCards = usuarios.filter((user) =>
    user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.estado?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.tipo_conta?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Navbar />

      <input
        type="text"
        placeholder="Buscar por nome, cidade, estado ou tipo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

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
          <div className="card-details">
            <h2>{selectedCard.nome}</h2>
            <p><strong>Email:</strong> {selectedCard.emailLo}</p>
            <p><strong>Contato:</strong> {selectedCard.contato}</p>
            <p><strong>Localização:</strong> {selectedCard.cidade}, {selectedCard.estado}</p>
            <p><strong>Horário:</strong> {selectedCard.cargaHoraria_min} - {selectedCard.cargaHoraria_max}</p>
            <p><strong>Faixa de Preço:</strong> R$ {selectedCard.valorServico_min} - R$ {selectedCard.valorServico_max}</p>
            <p><strong>Tipo de Conta:</strong> {selectedCard.tipo_conta}</p>
            <p><strong>Descrição:</strong> {selectedCard.descricao}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Principal;
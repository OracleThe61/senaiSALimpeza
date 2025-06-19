import React, { useContext, useEffect, useState } from 'react';
import './Perfil.css';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({});
  const [originalAccountData, setOriginalAccountData] = useState({});


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
    if (usuarioLogado) {
      setAccountData(usuarioLogado);
      setOriginalAccountData(usuarioLogado);
      console.log(accountData)
    }
  }, [usuarioLogado]);


  useEffect(() => {
    if (!usuarioLogado) {
      toast.warning('Você precisa estar logado para acessar esta página.');
      navigate('/');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalAccountData(accountData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restore `accountData` from `originalAccountData` on cancel.
    setAccountData(originalAccountData);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const confirmSave = async () => {
    try {
      await axios.put(`http://localhost:3000/usuarios/${usuarioLogado.id}`, accountData);

      setUsuarioLogado(accountData);
      setIsEditing(false);
      setShowSaveModal(false);

      toast.success('Dados salvos com sucesso!');
      setOriginalAccountData(accountData);
    } catch (error) {
      toast.error('Erro ao salvar dados. Tente novamente.');
      console.error('Erro ao salvar dados:', error);
    }
  };

  const cancelSave = () => {
    setShowSaveModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${usuarioLogado.id}`);

      setUsuarioLogado(null);
      setShowDeleteModal(false);
      navigate('/');
      toast.success('Conta excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir conta. Tente novamente.');
      console.error('Erro ao excluir conta:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setAccountData((prevData) => ({
      ...prevData,
      tipo_conta: newType,
      // Reset specific fields when changing type to 'cliente'
      cargaHoraria_inicio: newType === 'Cliente' ? null : prevData.cargaHoraria_inicio,
      cargaHoraria_fim: newType === 'Cliente' ? null : prevData.cargaHoraria_fim,
      valor_max: newType === 'Cliente' ? null : prevData.valor_max,
      valor_min: newType === 'Cliente' ? null : prevData.valor_min,
      descricao: newType === 'Cliente' ? null : prevData.descricao,
    }));
  };


  return (
    <div className="container-perfil">
      <Navbar />

      <div className="perfil-dados">
        <div className="img_perfil">
          <img id="img-perfil" src="/icons/testavatar.png" alt="Avatar do Perfil" />
        </div>

        <div>
          <h1 id="nome">{accountData?.nome}</h1>
          <h1>Email: {accountData?.email}</h1>
          <h1>Contato: {accountData?.contato}</h1>
          <h1>Estado: {accountData?.estado}</h1>
          <h1>Cidade: {accountData?.cidade}</h1>
        </div>
      </div>


      <div className="detalhes_conta">

        <h2>Detalhes da Conta</h2>

        <div className="input-group">
          <label htmlFor="tipo_conta">Tipo de Conta:</label>
          <select
            id="tipo_conta"
            name="tipo_conta"
            value={accountData.tipo_conta || ''}
            onChange={handleTypeChange}
            disabled={!isEditing} 
          >
            <option value="Cliente">Cliente</option>
            <option value="Prestador/a de Serviço">Prestador/a de Serviço</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome_detalhes"
            name="nome"
            value={accountData.nome || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={accountData.email || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="contato">Contato:</label>
          <input
            type="number"
            id="contato"
            name="contato"
            value={accountData.contato || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="cep">CEP:</label>
          <input
            type="number"
            id="cep"
            name="cep"
            value={accountData.cep || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={accountData.estado || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={accountData.cidade || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="rua">Rua:</label>
          <input
            type="text"
            id="rua"
            name="rua"
            value={accountData.rua || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>


        {accountData.tipo_conta === 'Prestador/a de Serviço' && (
          <>
            <div className="input-group">
              <label htmlFor="cargaHoraria_inicio">Carga Horária Início:</label>
              <input
                type="time"
                id="cargaHoraria_inicio"
                name="cargaHoraria_inicio"
                value={accountData.cargaHoraria_inicio || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="input-group">
              <label htmlFor="cargaHoraria_fim">Carga Horária Fim:</label>
              <input
                type="time"
                id="cargaHoraria_fim"
                name="cargaHoraria_fim"
                value={accountData.cargaHoraria_fim || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="input-group">
              <label htmlFor="valor_max">Valor do Serviço Máximo:</label>
              <input
                type="number"
                id="valor_max"
                name="valor_max"
                value={accountData.valor_max || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="input-group">
              <label htmlFor="valor_min">Valor do Serviço Mínimo:</label>
              <input
                type="number"
                id="valor_min"
                name="valor_min"
                value={accountData.valor_min || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="input-group">
              <label htmlFor="descricao">Descrição:</label>
              <textarea
                id="descricao"
                name="descricao"
                value={accountData.descricao || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
                rows="4"
              ></textarea>
            </div>
          </>
        )}


        <div className="button-group">
          {!isEditing ? (
            <>
              <button onClick={handleEditClick} className="edit-button">
                Editar
              </button>
              <button onClick={handleDeleteClick} className="delete-button">
                Excluir Conta
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSaveClick} className="save-button">
                Salvar Edição
              </button>
              <button onClick={handleCancelEdit} className="cancel-button">
                Cancelar Edição
              </button>
            </>
          )}
        </div>


        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Confirmar Exclusão</h3>
              <p>Tem certeza que deseja excluir sua conta? Esta ação é irreversível.</p>
              <div className="modal-actions">
                <button onClick={confirmDelete} className="confirm-button">
                  Sim, Deletar
                </button>
                <button onClick={cancelDelete} className="cancel-button">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}


        {showSaveModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Salvar Alterações</h3>
              <p>Deseja salvar as alterações na sua conta?</p>
              <div className="modal-actions">
                <button onClick={confirmSave} className="confirm-button">
                  Sim, Salvar
                </button>
                <button onClick={cancelSave} className="cancel-button">
                  Continuar Editando
                </button>
              </div>
            </div>
          </div>
        )}
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
    </div>
  );
}

export default Perfil;  
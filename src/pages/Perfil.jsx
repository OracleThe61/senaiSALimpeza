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
  const {usuarioLogado, setUsuarioLogado} = useContext(GlobalContext);
  const navigate = useNavigate();

  // `accountData` will hold the editable data. Initialize it with `usuarioLogado`
  // and update it with `handleInputChange`.
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

  // This effect ensures `accountData` and `originalAccountData` are updated
  // when `usuarioLogado` changes, which typically happens after a user logs in.

  useEffect(() => {
    if (usuarioLogado) {
      setAccountData(usuarioLogado);
      setOriginalAccountData(usuarioLogado);
      console.log(accountData)
    }
  });


  useEffect(() => {
    if (!usuarioLogado) {
      toast.warning('Você precisa estar logado para acessar esta página.');
      navigate('/');
    }
  }); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update `accountData` directly, as it's the editable state.
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // Ensure `originalAccountData` stores the current `accountData` for cancel.
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
      // You should send `accountData` to your API for update.
      // Assuming your backend expects a PUT request to update user data by ID.
      // Replace 'http://localhost:3000/usuarios/{id}' with your actual API endpoint.
      await axios.put(`http://localhost:3000/usuarios/${usuarioLogado.id}`, usuarios);

      // After successful save, update `usuarioLogado` in GlobalContext
      // with the new `accountData` to reflect changes globally.
      setUsuarioLogado(accountData);

      setIsEditing(false);
      setShowSaveModal(false);
      // Update `originalAccountData` to the newly saved data.
      setOriginalAccountData(accountData);
      toast.success('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      toast.error('Erro ao salvar dados. Tente novamente.');
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
      // Send a DELETE request to your API to remove the user.
      // Replace 'http://localhost:3000/usuarios/{id}' with your actual API endpoint.
      await axios.delete(`http://localhost:3000/usuarios/${usuarioLogado.id}`);

      // Clear the logged-in user from GlobalContext.
      setUsuarioLogado(null);
      setShowDeleteModal(false);
      toast.success('Conta excluída com sucesso!');
      navigate('/'); // Redirect to home or login page after deletion.
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir conta. Tente novamente.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setAccountData((prevData) => ({
      ...prevData,
      type: newType,
      // Reset specific fields when changing type to 'cliente'
      cargaHoraria_inicio: newType === 'cliente' ? '' : prevData.cargaHoraria_inicio,
      cargaHoraria_fim: newType === 'cliente' ? '' : prevData.cargaHoraria_fim,
      valor_max: newType === 'cliente' ? '' : prevData.valor_max,
      valor_min: newType === 'cliente' ? '' : prevData.valor_min,
      descricao: newType === 'cliente' ? '' : prevData.descricao,
    }));
  };

  // If `usuarioLogado` is null (not logged in), don't render the profile content yet.
  if (!usuarioLogado) {
    return (
      <div className="container-perfil">
        <Navbar />
        <p>Carregando perfil ou redirecionando...</p>
      </div>
    );
  }

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



      <h2>Detalhes da Conta</h2>

      <div className="input-group">
        <label htmlFor="tipo_conta">Tipo de Conta:</label>
        <select
          id="tipo_conta"
          name="tipo_conta"
          value={accountData.tipo_conta || ''}
          onChange={handleTypeChange}
          disabled={!isEditing} // Só pode mudar o tipo se estiver em modo de edição
        >
          <option value="cliente">Cliente</option>
          <option value="prestador">Prestador de Serviço</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          nome="nome"
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
        <label htmlFor="contact">Contato:</label>
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
        <label htmlFor="state">Estado:</label>
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
        <label htmlFor="city">Cidade:</label>
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
        <label htmlFor="street">Rua:</label>
        <input
          type="text"
          id="rua"
          name="rua"
          value={accountData.rua || ''}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
      </div>


      {accountData.type === 'prestador' && (
        <>
          ---
          <h3>Informações do Prestador de Serviço</h3>
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

      ---

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
    </div>
  );
}

export default Perfil;  
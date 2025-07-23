import React, { useContext, useEffect, useState, useCallback } from 'react';
import './Perfil.css';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';
import { formatPhoneNumber, formatCepNumber, validarEmail } from '../components/Formarter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Foto_de_perfil from '../components/Foto_de_perfil';

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({});
  const [originalAccountData, setOriginalAccountData] = useState({});

  const [displayContato, setDisplayContato] = useState('');
  const [displayCep, setDisplayCep] = useState('');


  useEffect(() => {
    if (usuarioLogado) {
      setAccountData(usuarioLogado);
      setOriginalAccountData(usuarioLogado);
      console.log(accountData)

      setDisplayContato(formatPhoneNumber(usuarioLogado.contato || ''));
      setDisplayCep(formatCepNumber(usuarioLogado.cep || ''));
    }
  }, [usuarioLogado]);


  // ativar caso houver mudança de desing para acesso ao perfil
  // useEffect(() => {
  //   if (!usuarioLogado) {
  //     toast.warning('Você precisa estar logado para acessar esta página.');
  //     navigate('/');
  //   }
  // }, [navigate]);

  const fetchAddressByCep = useCallback(async (cep) => {

    const cleanedCep = cep.replace(/\D/g, '');

    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = response.data;

        if (!data.erro) {
          setAccountData((prevData) => ({
            ...prevData,
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,

          }));
        } else {
          toast.error('CEP não encontrado. Verifique o CEP digitado.');

          setAccountData((prevData) => ({
            ...prevData,
            estado: '',
            cidade: '',
            rua: '',
          }));
        }
      } catch (error) {
        toast.error('Erro ao buscar CEP. Tente novamente.');
        console.error('Erro ao buscar CEP:', error);
        setAccountData((prevData) => ({
          ...prevData,
          estado: '',
          cidade: '',
          rua: '',
        }));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const rawValue = e.target.value;
    const cleanedValue = rawValue.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(rawValue);

    setAccountData((prevData) => ({
      ...prevData,
      contato: cleanedValue,
    }));

    setDisplayContato(formattedValue);
  };

  const handleCepChange = (e) => {
    const rawValue = e.target.value;
    const cleanedValue = rawValue.replace(/\D/g, '');
    const formattedValue = formatCepNumber(rawValue);

    setAccountData((prevData) => ({
      ...prevData,
      cep: cleanedValue,
    }));
    setDisplayCep(formattedValue);

    if (cleanedValue.length === 8) {
      fetchAddressByCep(cleanedValue);
    } else {
      setAccountData((prevData) => ({
        ...prevData,
        estado: '',
        cidade: '',
        rua: '',
      }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalAccountData(accountData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setAccountData(originalAccountData);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const confirmSave = async () => {
    try {

      if (validarEmail(accountData.email)) {
        await axios.put(`http://localhost:3000/usuarios/${usuarioLogado.id}`, accountData);

        setUsuarioLogado(accountData);
        setIsEditing(false);
        setShowSaveModal(false);

        toast.success('Dados salvos com sucesso!');
        setOriginalAccountData(accountData);
      } else {
        toast.error('Preencha todos os campos corretamente')
        setShowSaveModal(false);
      }
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
      return toast.success('Conta excluída com sucesso!');
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
          <Foto_de_perfil />
        </div>

        <div className='dados_usuario'>
          <h2 className="nome">{accountData?.nome}</h2>
          <p>Email: {accountData?.email}</p>
          <p>Contato: {accountData?.contato}</p>
          <p>Estado: {accountData?.estado}</p>
          <p>Cidade: {accountData?.cidade}</p>
          <p>Horario: {accountData?.cargaHoraria_inicio} - {accountData?.cargaHoraria_fim}</p>
          <p>Faixa de Preço: {accountData?.valor_min} - {accountData?.valor_max}</p>
        </div>
      </div>



      <div className="detalhes_conta">

        <div className='titulo'>
          <h1>Detalhes da Conta</h1>
        </div>

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
            type="text"
            id="contato"
            name="contato"
            value={displayContato || ''}
            onChange={handleContactChange}
            readOnly={!isEditing}
            maxLength="15"
          />
        </div>

        <div className="input-group">
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={displayCep || ''}
            onChange={handleCepChange}
            readOnly={!isEditing}
            maxLength="9"
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

      </div>


    </div>
  );
}

export default Perfil;  
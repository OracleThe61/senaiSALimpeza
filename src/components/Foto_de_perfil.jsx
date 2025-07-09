import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';


function Foto_de_perfil() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [fotosPerfil, setfotosPerfil] = useState([])
    const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);

       const fetchfotosPerfil = async () => {
        try {
            const response = await axios.get('http://localhost:3000/foto_perfil');
            setfotosPerfil(response.data);
        } catch (error) {
            console.error('Erro ao buscar Foto:', error);
        }
    };

    const salvarFoto = (e) => {
        const foto = e.target.files[0]
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    }

    const enviar_foto = async () => {
        try {

            if (teste) {
                toast.error("Preencha todos os campos corretamente");
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


    return (
        <div>
            <img id="img-perfil" src={UserIcon} alt="Avatar do Perfil" />

            <input type="file" onChange={salvarFoto} />
        </div>
    )
}

export default Foto_de_perfil
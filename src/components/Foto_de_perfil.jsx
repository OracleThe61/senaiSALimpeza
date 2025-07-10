import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import axios from 'axios';


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
        const file = e.target.files[0]
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
           salvarFoto()

            const foto = {
                link_foto: previewUrl,
                usuario_id: usuarioLogado.id
            }

            if (fotosPerfil.usuarios_id != usuarioLogado.id || !fotosPerfil.id) {

                const response = await axios.post('http://localhost:3000/foto_perfil', foto);
                if (response.status === 201) {

                    fetchfotosPerfil();
                }
            } else if (fotosPerfil.usuarios_id == usuarioLogado.id) {


                const response = await axios.post(`http://localhost:3000/foto_perfil/${usuarioLogado.id}`, foto);
                if (response.status === 201) {

                    fetchfotosPerfil();
                }

            }

        } catch (error) {
            console.error('Erro ao Enviar foto:', error);
        }
    }


    return (
        <div>
            <img id="img-perfil" src={fotosPerfil} alt="Avatar do Perfil" />

            <input type="file" onChange={salvarFoto} />
        </div>
    )
}

export default Foto_de_perfil
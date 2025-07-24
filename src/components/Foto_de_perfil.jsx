import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import './foto_perfil.css'
import UserIcon from '../assets/icons/user-icon.svg';
import axios from 'axios';

function Foto_de_perfil() {
    const [fotoPerfil, setfotoPerfil] = useState(null)
    const [imagemKey, setImagemKey] = useState(Date.now());
    const { usuarioLogado } = useContext(GlobalContext);

    const defaultAvatar = UserIcon;

    const fetchfotosPerfil = async () => {
        if (!usuarioLogado || !usuarioLogado.id) return;

        try {
            const response = await axios.get('http://localhost:3000/foto_perfil');
            const todasAsFotos = response.data;
            const fotoDoUsuario = todasAsFotos.find(foto => foto.usuarios_id === usuarioLogado.id);

            if (fotoDoUsuario) {
                setfotoPerfil(fotoDoUsuario);

            } else {
                setfotoPerfil(null);
            }

        } catch (error) {
            console.error('Erro ao buscar Foto:', error);
        }
    };

    useEffect(() => {
        fetchfotosPerfil();
    }, [usuarioLogado]);


    const enviar_foto = async (e) => {

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            const urlFoto = reader.result;

            const foto = {
                link_foto: urlFoto,
                usuarios_id: usuarioLogado.id
            }
            try {

                if (fotoPerfil) {
                    const response = await axios.put(`http://localhost:3000/foto_perfil/${fotoPerfil.id_foto_perfil}`, foto);
                    if (response.status === 200 || response.status === 201) {
                        await fetchfotosPerfil();
                        setImagemKey(Date.now());
                    }

                } else {
                    const response = await axios.post('http://localhost:3000/foto_perfil', foto);
                    if (response.status === 200 || response.status === 201) {
                        await fetchfotosPerfil();
                        setImagemKey(Date.now());
                    }
                }

            } catch (error) {
                console.error('Erro ao Enviar foto:', error);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='container_fotoPerfil'>
            <div>
                <img id="img-perfil"  key={imagemKey} src={fotoPerfil ? fotoPerfil.foto : defaultAvatar} alt="Avatar do Perfil" />

            </div>

            <div className='espaço_input'>
                <label htmlFor="inputFoto">Enviar Foto</label>
                <input type="file" id="inputFoto" className='inputFoto' accept="image/*" onChange={enviar_foto} />
            </div>

        </div>
    )
}

export default Foto_de_perfil
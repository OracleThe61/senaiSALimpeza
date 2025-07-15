import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import axios from 'axios';

function Foto_de_perfil() {
    const [fotosPerfil, setfotosPerfil] = useState(null)
    const { usuarioLogado } = useContext(GlobalContext);
    const [key, setKey] = useState(0);

    const defaultAvatar = "https://placehold.co/150x150/EFEFEF/333?text=Perfil";

    const fetchfotosPerfil = async () => {
        if (!usuarioLogado || !usuarioLogado.id) return;

        try {
            const response = await axios.get('http://localhost:3000/foto_perfil');
            const todasAsFotos = response.data;
            const fotoDoUsuario = todasAsFotos.find(foto => foto.usuarios_id === usuarioLogado.id);

            if (fotoDoUsuario) {
                setfotosPerfil(fotoDoUsuario);

            } else {
                setfotosPerfil(null);
            }

        } catch (error) {
            console.error('Erro ao buscar Foto:', error);
        }
    };

    useEffect(() => {
        fetchfotosPerfil();
    }, [usuarioLogado]);

    useEffect(() => {
        console.log("Estado atual de fotosPerfil:", fotosPerfil);
        if (fotosPerfil) {
            console.log("Conteúdo de fotosPerfil.foto:", fotosPerfil.foto ? fotosPerfil.foto.substring(0, 100) + '...' : 'N/A');
        }
        setKey(prevKey => prevKey + 1); // Incrementa a chave sempre que fotosPerfil muda
    }, [fotosPerfil]);

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

                if (fotosPerfil) {
                    const response = await axios.put(`http://localhost:3000/foto_perfil/${fotosPerfil.id_foto_perfil}`, foto);
                    if (response.status === 201) {
                        fetchfotosPerfil();

                    }
                } else if (fotosPerfil.usuarios_id != usuarioLogado.id) {
                    const response = await axios.post('http://localhost:3000/foto_perfil', foto);
                    if (response.status === 201) {
                        fetchfotosPerfil();

                    }

                }
            } catch (error) {
                console.error('Erro ao Enviar foto:', error);
            }
        };
        reader.readAsDataURL(file);
    };


    return (
        <div>
            <img id="img-perfil" src={fotosPerfil ? fotosPerfil.foto : defaultAvatar} alt="Avatar do Perfil" />

            <input type="file" accept="image/*" onChange={enviar_foto} />
        </div>
    )
}

export default Foto_de_perfil
import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../contexts/GlobalContext"
import './Botao_logout.css'


function bnt_Logout() {
    const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext)
   
    const navigate = useNavigate()

    const deslogar = () => {
        if (usuarioLogado) {
            console.log(usuarioLogado)
            setUsuarioLogado(null)
            navigate("/")
            toast.success("Voce saiu de sua conta");
        } else {
            toast.error("Voce não esta logado");
        }
    };

    return (
        <div onClick={deslogar} className='bnt_logout'>Logout</div>
    )
}


export default bnt_Logout;
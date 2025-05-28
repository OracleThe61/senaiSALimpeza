import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './Botao_logout.css'


function logout() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuario) {
        localStorage.removeItem("usuarioLogado");

        toast.success("Voce saiu de sua conta");
    } else {
        toast.error("Voce não esta logado");
    }

}

function bnt_Logout() {
    return (
        <div onClick={logout} className='bnt_logout'>Logout</div>
    )
}


export default bnt_Logout;
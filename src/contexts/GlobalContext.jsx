import { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado')
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null

})

useEffect(() => {
    if(usuarioLogado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    }else{
        localStorage.removeItem('usuarioLogado');
    }
}, [usuarioLogado])

    return(
        <GlobalContext.Provider value={{
            usuarioLogado,
            setUsuarioLogado
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
// let usuarioLogado = 'Gill Bates'
const [usuarioLogado, setUsuarioLogado] = useState(undefined)


    return(
        <GlobalContext.Provider value={{
            usuarioLogado,
            setUsuarioLogado
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
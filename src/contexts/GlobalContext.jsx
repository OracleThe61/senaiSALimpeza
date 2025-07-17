import { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
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
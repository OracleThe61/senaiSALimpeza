import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
// let usuarioLogado = 'Gill Bates'
const [usuarioLogado, setUsuarioLogado] = useState(undefined)
const [usuarioCadastrado, setUsuarioCadastrado] = useState([{
        id: 123,
        nome: "Bianca",
        email: "bia@gmail.com",
        tipo_conta: "Prestador/a de Serviço",
        senha: 123
    }, {
        id: 123,
        nome: "Carlos",
        email: "carlos@gmail.com",
        tipo_conta: "Cliente",
        senha: 321
    }, {
        id: 123,
        nome: "João",
        email: "joao@gmail.com",
        tipo_conta: "Prestador/a de Serviço",
        senha: 213
    }, {
        id: 123,
        nome: "paulo",
        email: "paulo@gmail.com",
        tipo_conta: "Cliente",
        senha: 312
    },])

    return(
        <GlobalContext.Provider value={{
            usuarioLogado,
            setUsuarioLogado,
            usuarioCadastrado,
            setUsuarioCadastrado
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
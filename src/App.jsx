import { useState } from 'react'
import './App.css'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Perfil from './pages/Perfil'

function App() {
  const [pagina, setPagina] = useState(<Login />)

  return (
    <div className='container-app'>
      <nav className='cabecalho'>
        <div className='container-home'>
          <img src="/icons/icon-home.svg" onClick={() => setPagina(<Home />)} className='icone-home' />
        </div>

        <div className='container-botoes-app'>
          <button className='botao-ir-perfil' onClick={() => setPagina(<Perfil />)}>Perfil</button>
          <button className='botao-ir-cad' onClick={() => setPagina(<Cadastro />)}>Cadastro</button>
          <button className='botao-ir-log' onClick={() => setPagina(<Login />)}>Login</button>
        </div>
      </nav>

      {pagina}
    </div>
  )
}

export default App

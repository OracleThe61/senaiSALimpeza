import './Aviso.css'
import AvisoIcon from '../assets/icons/aviso-icon.svg';

function Aviso() {
  return (
    <div className='cointainer_aviso'>
        <img id="img-aviso" src={AvisoIcon} alt="icone-aviso" />
        <p className='msg_aviso'>Por favor, preencha todas as suas informações de perfil</p>
    </div>
  )
}

export default Aviso
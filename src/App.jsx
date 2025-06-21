import { useState } from 'react'
import './App.css'




function App() {

  return (
    <div className='container-app'>
      <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
            />
    </div>
  )
}

export default App

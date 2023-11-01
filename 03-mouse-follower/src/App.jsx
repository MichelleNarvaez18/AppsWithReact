import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x:0, y:0 })

  //Pointer Move
  useEffect( () => {
    console.log('effect', {enable})

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove' , { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    //SI solo esta activo el botón.
    if(enable) { 
      window.addEventListener('pointermove', handleMove)
    }
    //cleanup
    //Limpiar los elementos (Cuando el elemento se desmonta)
    // -> en la console puede getEventListener
    return () => {
      console.log('CleanUp')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  //Change body className
  useEffect( () => {
    document.body.classList.toggle('no-cursor', enable)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])
  return (
    <>
    <div style={{
      position: 'absolute',
      backgroundColor:'rgba(0,0,0,0.5)',
      border: '3px solid #fff',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left:-20,
      top: -20,
      width: 40,
      height: 50,
      transform: `translate(${position.x}px, ${position.y}px)`
    }}/>
    <button onClick={() => setEnable(!enable)}>
      {enable ? 'Desactivar' : 'Activar'} puntero
    </button>
    </>
  )
}
function App() {

  return (    
    <main>
      <FollowMouse/>      
    </main>
  )
}

export default App

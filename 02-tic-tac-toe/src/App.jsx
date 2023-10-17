import { useState } from 'react'
import './App.css'
import './index.css'

// eslint-disable-next-line no-unused-vars
const TURNS = {
  X: 'x',
  O: 'o'
}

// eslint-disable-next-line react/prop-types
const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}` 
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
} 

//Como ser combinaciones minimas ganadores??
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {  

  const [board, setBoard ] = useState(
    Array(9).fill(null)
  )  
  const [turn, setTurn] = useState(TURNS.X)
//null es que no hay ganador, false es que hay un empate
const [winner, setWinner] = useState(null)

//revisamos todas las combinaciones ganadoras; Si gana X u O
const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS){
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] &&
      boardToCheck[a] == boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  //Si no hay ganador
  return null
}

const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
}

  const updateBoard = (index) => {
    //No actualiza si hay algo en la posicion o si ya hay un ganador
    if ( board[index] || winner ) return
    //Crear un nuevo TABLERO (array)  con el nuevo valor.
    const newBoard = [ ... board]
    newBoard[index] = turn
     //Actualizar Tabalero(BOARD) 
     setBoard(newBoard)

    //Cambiar turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay un ganador 
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  return (
      <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {
            board.map((_, index) => {
              return (
                <Square key={index} 
                  index={index} 
                  updateBoard={updateBoard}
                >
                  {board[index]} 
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={ turn === TURNS.X }>
            {TURNS.X}
          </Square>
          <Square isSelected={ turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
        {
          winner != null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner == false ? 'Empate' : 'Ganó '
                  }
                </h2>
                <header className='win'>
                  { winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>  

            </section>
          )
        }
      </main>
  )
}

export default App

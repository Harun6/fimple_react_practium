import userEvent from '@testing-library/user-event'
import React, { useEffect, useState } from 'react'

export default function App() {

  const initialData = [
    { id: '1', value: '' },
    { id: '2', value: '' },
    { id: '3', value: '' },
    { id: '4', value: '' },
    { id: '5', value: '' },
    { id: '6', value: '' },
    { id: '7', value: '' },
    { id: '8', value: '' },
    { id: '9', value: '' }]

  const [gameStatus, gameStatusData] = useState(true)
  const  [activeUser, setActiveUser] = useState(1)  
  const [layers, setLayers] = useState(initialData)
  const [winner, setWinner] = useState(initialData)
  const winnerStatus = [
    ['1','2','3'],
    ['1','5','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','5','7'],
    ['3','6','9'],
    ['4','5','6'],
    ['7','8','9']

  ]

  const box = {
    border: '1px solid black',
    width: '200px',
    height: '200px'
  }

  const onLayerClick = (e) =>{
    const newlayerData = layers
    if ((newlayerData.find(element => element.id === e).value) !== '') {
      return
    }
    if (activeUser === 1) {
      newlayerData.find(element => element.id === e).value = 'X'
      setActiveUser(2) 
    }
    else{
      newlayerData.find(element => element.id === e).value = 'O'
      setActiveUser(1) 
    }
    setLayers(newlayerData)
  }

  function multipleExist(arr, values){
    return values.every(value => {
      return arr.indexOf(value) !== -1;
    })
  }

  const resetGame = () => {
    gameStatusData(true)
    setActiveUser(false)
    setLayers(initialData)
    setWinner(0)
  }

  useEffect(() => {
    const userData1 = layers.filter(a => a.value === "X").map(element => {return element.id})
    const userData2 = layers.filter(a => a.value === "O").map(element => {return element.id})
    winnerStatus.forEach(element => {
      if (multipleExist(userData1, element)) {
        setWinner(1)
        gameStatusData(false)
      }
      if (multipleExist(userData2, element)) {
        setWinner(2)
        gameStatusData(false)
      }
    })
  })

    useEffect(() => {
      setActiveUser(Math.random() < 0.5 ? 0 : 1)
    }, [gameStatus])

  return (
    <div className='container'>
      {gameStatus ? null : <h1>Game Winner! {winner}</h1>}
      {gameStatus ? null : <> <h1>Restart Game! {winner}</h1> <button onClick={resetGame}>New Game</button></>}
      {gameStatus ? activeUser === 1 ? <h5> It's on player 1 </h5> : <h5> It's on player 2</h5> : null}
      <div className='row ' style={{marginTop: '100px'}}>
        {
          layers.map(layer => {
            return (
              <div key={layer.id} className='col-4' onClick={()=>{onLayerClick(layer.id)}} style={box}>
                {layer.value}
              </div>
            )
          })
        }

      </div>
    </div>
  )
}


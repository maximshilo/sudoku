import { useState, useEffect } from 'react'

import './App.css';

const grids = [
  [
    [6, 0, 5, 4, 0, 0, 3, 0, 2],
    [7, 3, 4, 0, 6, 0, 0, 5, 8],
    [0, 1, 0, 5, 3, 0, 0, 0, 0],
    [0, 4, 2, 6, 0, 7, 1, 9, 5],
    [0, 9, 7, 0, 0, 4, 0, 6, 0],
    [0, 0, 0, 0, 1, 3, 0, 0, 7],
    [9, 0, 6, 3, 0, 5, 0, 0, 0],
    [4, 7, 0, 0, 9, 1, 0, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0]
  ],
  [
    [3, 0, 5, 4, 0, 0, 3, 0, 2],
    [7, 3, 4, 0, 6, 0, 0, 5, 8],
    [0, 1, 0, 5, 3, 0, 0, 0, 0],
    [0, 4, 2, 6, 0, 7, 1, 9, 5],
    [0, 9, 7, 0, 0, 4, 0, 6, 0],
    [0, 0, 0, 0, 1, 3, 0, 0, 7],
    [9, 0, 6, 3, 0, 5, 0, 0, 0],
    [4, 7, 0, 0, 9, 1, 0, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0]
  ]
]

function App() {
  const [currentGridIndex, setCurrentGridIndex] = useState(0)
  const [grid, setGrid] = useState(grids[currentGridIndex])

  useEffect(() => { loadGrid() }, [])

  function loadGrid() {
    let numOfGrids = grids.length
    let nextGridIdx = parseInt(Math.random() * numOfGrids)
    setCurrentGridIndex(nextGridIdx)
    setGrid([...grids[nextGridIdx].map(row => [...row])])
  }

  function displayGrid() {
    return (
      <div className='col'>
        {
          grids[0].map((row, rowIndex) => {
            return (
              <div className='col'>
                {rowIndex % 3 == 0 ? <div className='horizontal'></div> : <></>}
                <div className='row'>
                  {row.map((square, squareIndex) => {
                    let inputValue = grid[rowIndex][squareIndex]
                    let isDisabled = false

                    if (inputValue == grids[currentGridIndex][rowIndex][squareIndex] && inputValue != 0) {
                      isDisabled = true
                    } else if (inputValue == 0) {
                      inputValue = ''
                    }

                    let inputStyle = {

                    }
                    return (
                      <div className='row'>
                        {squareIndex % 3 == 0 ? <div className='vertical'></div> : <></>}

                        <input
                          style={inputStyle}
                          value={inputValue}
                          disabled={isDisabled}
                          onChange={(e) => {
                            grid[rowIndex][squareIndex] = e.target.value
                            setGrid([...grid])
                            checkWinningCondition()
                          }}
                        >
                        </input>

                        {squareIndex + 1 == row.length ? <div className='vertical'></div> : <></>}
                      </div>
                    )
                  })}
                </div>
                {rowIndex + 1 == grids[0].length ? <div className='horizontal'></div> : <></>}
              </div>
            )
          })
        }
      </div>
    )
  }

  function checkWinningCondition() {
    let range = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let rowsFlag = false
    let housesFlag = false

    let rows = grid.map(row => row.toSorted())
    // let houses = [[], [], [], [], [], [], [], [], []]\
    let houses = [...grid.map(row => [...row])]
    houses = houses.flat()
    
    let tempHouses = [[], [], [], [], [], [], [], [], []]
    let tempHousesIndexModifier = -1

    houses.forEach((number, index) => {
      if (index % 18 == 0) tempHousesIndexModifier ++
      tempHouses[tempHousesIndexModifier + Math.floor((index % 9) / 3)].push(number)
    })

    console.log(tempHouses)
    
  }


  return (
    <div className="App">
      <button onClick={() => { loadGrid() }}>NEW GAME</button>
      {displayGrid()}
    </div>
  );
}

export default App;

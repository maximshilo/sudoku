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
    [6, 0, 0, 0, 3, 1, 4, 0, 0],
    [0, 3, 0, 8, 0, 5, 0, 0, 2],
    [0, 0, 9, 0, 0, 0, 0, 0, 8],
    [5, 6, 0, 0, 2, 4, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 8, 7],
    [1, 0, 7, 3, 8, 6, 2, 0, 0],
    [4, 0, 0, 6, 5, 0, 8, 9, 0],
    [9, 2, 0, 1, 7, 0, 3, 0, 5],
    [8, 5, 1, 0, 4, 0, 0, 0, 0]
  ],
  [
    [4, 0, 3, 0, 0, 0, 1, 0, 5],
    [0, 6, 0, 9, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 4, 6],
    [9, 3, 2, 0, 8, 1, 0, 7, 4],
    [0, 0, 0, 0, 9, 7, 3, 0, 0],
    [0, 1, 4, 0, 2, 6, 9, 5, 8],
    [0, 4, 7, 8, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 5, 0, 0],
    [6, 0, 9, 1, 0, 0, 0, 8, 0],
  ],
  [
    [0, 6, 0, 4, 0, 1, 3, 7, 0],
    [1, 0, 0, 0, 0, 0, 4, 2, 0],
    [3, 0, 0, 0, 0, 2, 0, 6, 1],
    [4, 9, 6, 0, 0, 0, 0, 3, 2],
    [0, 0, 8, 3, 6, 9, 0, 0, 0],
    [0, 5, 3, 0, 0, 8, 1, 9, 6],
    [6, 4, 0, 8, 1, 3, 2, 0, 0],
    [0, 0, 0, 6, 0, 7, 0, 0, 0],
    [0, 0, 0, 5, 9, 0, 0, 0, 3],
  ],
  [
    [9, 0, 1, 0, 5, 3, 0, 0, 0],
    [4, 6, 0, 0, 0, 7, 3, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 8, 0],
    [0, 0, 0, 0, 7, 0, 1, 0, 6],
    [0, 0, 6, 0, 0, 4, 0, 0, 0],
    [5, 1, 0, 0, 0, 0, 0, 7, 8],
    [2, 4, 5, 7, 3, 0, 9, 0, 1],
    [0, 0, 0, 9, 4, 0, 0, 5, 0],
    [1, 0, 7, 6, 2, 0, 8, 4, 3],
  ]
]

function App() {
  const [currentGridIndex, setCurrentGridIndex] = useState(0)
  const [grid, setGrid] = useState(grids[currentGridIndex])

  
  function loadGrid() {
    let numOfGrids = grids.length
    let nextGridIdx = parseInt(Math.random() * numOfGrids)
    
    while (nextGridIdx === currentGridIndex) {
      nextGridIdx = parseInt(Math.random() * numOfGrids)
    }
    
    setCurrentGridIndex(nextGridIdx)
    setGrid([...grids[nextGridIdx].map(row => [...row])])
  }
  
  useEffect(() => { loadGrid() }, [])

  function displayGrid() {
    return (
      <div className='col'>
        {
          grids[0].map((row, rowIndex) => {
            return (
              <div className='col'>
                {rowIndex % 3 === 0 ? <div className='horizontal'></div> : <></>}
                <div className='row'>
                  {row.map((square, squareIndex) => {
                    let inputValue = grid[rowIndex][squareIndex]
                    let isDisabled = false

                    if (inputValue === grids[currentGridIndex][rowIndex][squareIndex] && inputValue !== 0) {
                      isDisabled = true
                    } else if (inputValue === 0) {
                      inputValue = ''
                    }

                    let inputStyle = {

                    }
                    return (
                      <div className='row'>
                        {squareIndex % 3 === 0 ? <div className='vertical'></div> : <></>}

                        <input
                          type='number'
                          style={inputStyle}
                          value={inputValue}
                          disabled={isDisabled}
                          onKeyDown={(e) => {
                            let key = e.key
                            let value = e.target.value
                            let allowedKeys = '1 2 3 4 5 6 7 8 9'
                            if (key !== 'Backspace' && (value.length > 0 || allowedKeys.indexOf(key) === -1)) e.preventDefault()
                            else return true
                          }}
                          onChange={(e) => {
                            let value = e.target.value

                            if (isNaN(value)) grid[rowIndex][squareIndex] = 0
                            else grid[rowIndex][squareIndex] = parseInt(e.target.value)

                            setGrid([...grid])
                            if (checkWinningCondition()) win()
                          }}
                        >
                        </input>

                        {squareIndex + 1 === row.length ? <div className='vertical'></div> : <></>}
                      </div>
                    )
                  })}
                </div>
                {rowIndex + 1 === grids[0].length ? <div className='horizontal'></div> : <></>}
              </div>
            )
          })
        }
      </div>
    )
  }

  function checkWinningCondition() {
    let rows = grid.map(row => row.toSorted()) // every row

    // houses is every 3x3 square
    // first i map and flat the current grid
    // then i push every number into it's corresponding house
    // the final houses list is tempHouses

    let houses = [...grid.map(row => [...row])] // map
    houses = houses.flat() // flat

    let tempHouses = [[], [], [], [], [], [], [], [], []] // prepare the final lists
    let tempHousesLevelModifier = 0 // level is the 'vertical' adjustment
    let temphousesSegmentModifier = 0 // segment is the 'horizontal' adjustment

    // the board is divided as follows 
    //
    //  --- --- ---
    // |0+0|0+1|0+2|
    //  --- --- --- 
    // |3+0|3+1|3+2|
    //  --- --- ---
    // |6+0|6+1|6+2|
    //  --- --- ---

    houses.forEach((number, index) => {
      if (index % 27 === 0 && index !== 0) tempHousesLevelModifier += 3

      if (index % 9 < 3) temphousesSegmentModifier = 0
      else if (index % 9 < 6) temphousesSegmentModifier = 1
      else temphousesSegmentModifier = 2


      tempHouses[tempHousesLevelModifier + temphousesSegmentModifier].push(number)
    })

    tempHouses.forEach((house, idx) => {
      house.sort()
      house.length = 9 // set the length of the array as to not encounter an index out of range error
    })

    let allEntries = [...rows.concat(tempHouses)] // finally concat the rows and the houses
    let flag = false

    allEntries.forEach(entry => {
      if (!flag && entry[0] === 1 && entry[8] === 9) {
        if (entry.reduce((a, b) => a + b) !== 45) flag = true
      } else {
        flag = true
      }
    })

    return !flag
  }

  function win() {
    alert('You WON! Congratulations!')
    loadGrid()
  }

  return (
    <div className="App">
      <div className='gameContainer'>
        <div className='titleRow'>
          <h1>SUDOKU</h1>
          <button className='newGameButton' onClick={() => { loadGrid() }}>NEW GAME</button>
        </div>
        {displayGrid()}
      </div>
    </div>
  );
}

export default App;

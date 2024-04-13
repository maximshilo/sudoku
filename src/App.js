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
]

function App() {
  const [grid, setGrid] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44,
    45, 46, 47, 48, 49, 50, 51, 52, 53,
    54, 55, 56, 57, 58, 59, 60, 61, 62, 
    63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 
  ])

  function loadGrid() {
    let numOfGrids = grids.length
    let nextGridIdx = parseInt(Math.random() * numOfGrids)
    setGrid(grids[nextGridIdx])
  }

  function displayGrid() {
    return (
      <div className='col'>
        {
          grid.map((square, idx) => {
            let horizontal = idx % 27 == 0
            let vertical = idx % 9 == 0 && !horizontal
            return (
              <div className={horizontal ? 'col' : 'row'}>
              {horizontal ? <div className='horizontal'></div> : <></>}
              <input type='text'></input>
              {vertical ? <div className='vertical'></div> : <></>}
              </div>
            )
          })
        }
      </div>
    )
  }

  function checkWinningCondition() { }

  // useEffect(() => { loadGrid() }, [])

  return (
    <div className="App">
      { displayGrid() }
    </div>
  );
}

export default App;

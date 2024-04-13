function generateEmptyGrid (n) {
    // takes n for the dimensions of the grid
    // returns an n*n grid of 0s
    
    // create an emty array with the length of n
    let grid = new Array(n)

    // fill all n elements of the array with empty arrays with the length of n
    grid.fill(new Array(n), 0, n)

    // fill every empty array with 0s
    grid.forEach(e => e.fill(0, 0, n))

    // return the populated grid
    return grid
}

function solveGrid (grid) {

}

function checkGrid (grid) {

}

function fillGrid (grid, flag) {
    let nextZero = { x: -1, y: -1 }

    for(let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] = 0) {
                nextZero = { x : i, y : j }
                i = grid.length + 1
                j = grid.length + 1
            }
        }
    }

    if (nextZero.x == -1) {
        return grid
    } else {

        for (let i = 0; i < grid.length; i++) {

        }

    }
}


let grid = generateEmptyGrid(9)
console.log(fillGrid(grid))
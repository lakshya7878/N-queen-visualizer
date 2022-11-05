
// each solution is an array
const meetContraints = (rows, column, solution) => {
    for (let i = 0; i < rows; i++) {
        if (solution[i] === column || 
        Math.abs(column - solution[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}

//Function to loop through all column in a row 


const eachRow = (row, columns, prevSolutions) => {

    let newSolutions = [];
    let prev = prevSolutions;
  
   for (let i = 0; i< prev.length; i++) {
       let solution = prev[i];
     //loop through n columns
       for (let j = 0; j < columns; j++) {
       //check if possible to place a queen in column j
           if (meetContraints(row, j, solution)) {
               // can place a queen at column j 
               newSolutions.push(solution.concat([j]));           
         } 
       }
     }
   if (row === columns - 1) {
     result = newSolutions;
     
   } else {
     // continue to other rows
     eachRow(row + 1, columns, newSolutions); 
   }
   return result;   
};




const solve_Nqueens = (n) => {
    const init = [[]];
    const totalSolutions = eachRow(0, n, init);
    return totalSolutions;
}


//Draw chess board function

const drawBoard = (n, randomSol) => {

const queen = {
 name: "queen",
 w: "\u2655",
 b: "\u265B"
};

///// Draw
const boxSize = 50,
 boardDimension = n,
 boardSize = boardDimension * boxSize,
 margin = 100;
// Get n queens solutions 
// set <body>
const div = d3.select("#chessboard");
// create <svg>
const svg = div.append("svg")
 .attr("width", boardSize + "px")
 .attr("height", boardSize + "px");

// loop through 8 rows and 8 columns to draw the chess board
for (let i = 0; i < 8; i++) {
 for (let j = 0; j < 8; j++) {
   // draw each chess field
   const box = svg.append("rect")
     .attr("x", i * boxSize)
     .attr("y", j * boxSize)
     .attr("width", boxSize + "px")
     .attr("height", boxSize + "px");
   if ((i + j) % 2 === 0) {
     box.attr("fill", "beige");
   } else {
     box.attr("fill", "gray");
   }

   // draw chess pieces 
   const chess = svg.append("text")
     .classed('draggable', true)
     .style("font-size", '40')
     .attr("text-anchor", "middle")
     .attr("x", i * boxSize)
     .attr("y", j * boxSize)
     .attr("dx", boxSize / 2)
     .attr("dy", boxSize * 2 / 3);
   
   chess.attr("X", chess.attr("x"))
     .attr("Y", chess.attr("y"));
   // // Draw pieces
   if (j === nQueens[randomSol][i]) {
     chess.classed('queens', true)
       .text(queen.b);
   }
 }
}
}

const nQueens = solve_Nqueens(4);
// Generate a whole random number between 0 and nQueens.length (exclusive)
const randomSolution = () => { 
 return Math.floor(Math.random()*nQueens.length);
}
let random = randomSolution();
drawBoard(4, random);


const gameBoard = document.querySelector('.game-board');
const cellsArray = document.querySelectorAll('.game-board div');
console.log(gameBoard);
console.log(cellsArray);

const bWidth = 5;
let currentPosition = 0;

// Tetros
const lTetro = [0,0+bWidth, (0+bWidth)*2, (0+bWidth)*2+1];
console.log(lTetro);

// Function
function render(){
    lTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.add('cell');
    });
}
render();

function unRender(){
    lTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.remove('cell');
    });
}
// unRender();

function moveDown(){
    unRender();
    console.log(`before ${currentPosition}`);
    // if(currentPosition<35){
    //     currentPosition = currentPosition + 5;
        
    // }else{
    //     currentPosition = 0;
    // }
    // console.log(`After: ${currentPosition}`);
    currentPosition = currentPosition + 5;
    render();
    stop();
}


var intervalId = window.setInterval(function(){
    moveDown();
  }, 1000);

// function stop(){
//     const w = 5; 
//     function stopDecider(){
//       let s = lTetro.some(function(i){
//         return cellsArray[i+w].hasAttribute('class','stop');
//         console.log(cellsArray[i+w]);
//         });
//         return s;
//     };
//     if(stopDecider){
//         clearInterval(intervalId);  
//     }
//     else return;
// }

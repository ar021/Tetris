const gameBoard = document.querySelector('.game-board');
let cellsArray = Array.from(document.querySelectorAll('.game-board div'));
console.log(gameBoard);
console.log(cellsArray);

const bWidth = 10;


// Tetros
const lTetro = [
    [1, bWidth + 1, bWidth * 2 + 1, 2],
    [bWidth, bWidth + 1, bWidth + 2, bWidth * 2 + 2],
    [1, bWidth + 1, bWidth * 2 + 1, bWidth * 2],
    [bWidth, bWidth * 2, bWidth * 2 + 1, bWidth * 2 + 2]
];
const iTetro = [
    [1, bWidth + 1, bWidth * 2 + 1, bWidth * 3 + 1],
    [bWidth, bWidth + 1, bWidth + 2, bWidth + 3],
    [1, bWidth + 1, bWidth * 2 + 1, bWidth * 3 + 1],
    [bWidth, bWidth + 1, bWidth + 2, bWidth + 3]
];
const tTetro = [
    [1, bWidth, bWidth + 1, bWidth + 2],
    [1, bWidth + 1, bWidth + 2, bWidth * 2 + 1],
    [bWidth, bWidth + 1, bWidth + 2, bWidth * 2 + 1],
    [1, bWidth, bWidth + 1, bWidth * 2 + 1]
];
const zTetro = [
    [0, bWidth, bWidth + 1, bWidth * 2 + 1],
    [bWidth + 1, bWidth + 2, bWidth * 2, bWidth * 2 + 1],
    [0, bWidth, bWidth + 1, bWidth * 2 + 1],
    [bWidth + 1, bWidth + 2, bWidth * 2, bWidth * 2 + 1]
];
const oTetro = [
    [0, 1, bWidth, bWidth + 1],
    [0, 1, bWidth, bWidth + 1],
    [0, 1, bWidth, bWidth + 1],
    [0, 1, bWidth, bWidth + 1]
];
const tetros = [lTetro, iTetro, tTetro, zTetro, oTetro];

// Current Position & Tetro
let currentPosition = 4;
let currentRoatation = 0;
let random = Math.floor(Math.random() * tetros.length); // random selection
let currentTetro = tetros[random][currentRoatation];
console.log(currentTetro);








// Function
function render(){
    console.log('render run');
    currentTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.add('cell');
    });

}
// render();

function unRender(){
    console.log('unRender run');
    currentTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.remove('cell');
    });
}
// unRender();

function moveDown(){
    console.log('movedown run');
    unRender();
    // console.log(lTetro);
    console.log(`before ${currentPosition}`);
    // if(currentPosition<35){
    //     currentPosition = currentPosition + 5;
        
    // }else{
    //     currentPosition = 0;
    // }
    // console.log(`After: ${currentPosition}`);
    currentPosition = currentPosition + bWidth;
    render();
    stop();
}


var intervalId = window.setInterval(function(){
    moveDown();
  }, 1000);

function stop(){
    console.log('stop run');
    function stopDecider(){
      return currentTetro.some(function(i){
        // return cellsArray[currentPosition + i + w].hasAttribute('class','stop');
        // console.log(cellsArray[currentPosition + i + w]);
        console.log('stopDecider run');
        return cellsArray[currentPosition + i + bWidth].classList.contains('stop');
        });
    };
    if(stopDecider()){
        currentTetro.forEach(function(i){
            cellsArray[currentPosition + i].classList.add('stop');
        });
        currentPosition = 4;
        random = Math.floor(Math.random() * tetros.length);
        currentTetro = tetros[random][currentRoatation];
        render();
    }
    return;
}

function filled(){
    currentTetro.some(function(i){
        console.log('filled run');
        return cellsArray[currentPosition + i ].classList.contains('stop');
    });
}

function left(){
    unRender();
    function leftDecider(){
        return currentTetro.some(function(i){
          console.log('leftDecider run');
          return (currentPosition + i) % bWidth === 0;
        });
    }
    if(!leftDecider()){
        currentPosition = currentPosition - 1;
        if(filled()){
            currentPosition = currentPosition + 1;
        }
        render();
    } 
    return;
}

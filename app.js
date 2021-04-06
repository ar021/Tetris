const gameBoard = document.querySelector('.game-board');
let cellsArray = Array.from(document.querySelectorAll('.game-board div'));
// console.log(gameBoard);
// console.log(cellsArray);

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
let currentPosition = 6;
let currentRoatation = 0;
let random = Math.floor(Math.random() * tetros.length); // random selection
let currentTetro = tetros[random][currentRoatation];
// console.log(currentTetro);

// Event listner
document.addEventListener('keydown',function(e){
    
    if(e.key === 'ArrowLeft'){
        console.log(`Key${e.code} has pressed`);
        leftMove();
    }
    if(e.key === 'ArrowRight'){
        console.log(`Key${e.code} has pressed`);
        rightMove();
    }
    if(e.key === 'ArrowDown'){
        console.log(`Key${e.code} has pressed`);
        downMove();
    }
    if(e.key === 'ArrowUp'){
        console.log(`Key${e.code} has pressed`);
        e.preventDefault();
        rotate();
    }
    return;
});






// Function


function render(){
    // console.log('render run');
    currentTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.add('cell');
    });

}
// render();

function unRender(){
    // console.log('unRender run');
    currentTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.remove('cell');
    });
}
// unRender();

function moveDown(){
    // console.log('movedown run');--------
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
  }, 500);

function stop(){
    // console.log('stop run');-----------
    function stopDecider(){
      return currentTetro.some(function(i){
        // return cellsArray[currentPosition + i + w].hasAttribute('class','stop');
        // console.log(cellsArray[currentPosition + i + w]);
        // console.log('stopDecider run'); -----
        return cellsArray[currentPosition + i + bWidth].classList.contains('stop');
        });
    };
    if(stopDecider()){
        currentTetro.forEach(function(i){
            cellsArray[currentPosition + i].classList.add('stop');
        });
        currentPosition = 6;
        random = Math.floor(Math.random() * tetros.length);
        currentTetro = tetros[random][currentRoatation];
        render();
    }
    return;
}

// Move - Left

function filledLeft(){
    return  currentTetro.some(function(i){
          console.log(`${cellsArray[currentPosition + i ].classList.contains('stop')}`);
          return cellsArray[currentPosition + i ].classList.contains('stop');
      });
};

function leftDecider(){
    return currentTetro.some(function(i){
    //   console.log('leftDecider run');-------
      return (currentPosition + i) % bWidth === 0;
    });
};

function leftMove(){
    unRender();
    if(!leftDecider()){
        currentPosition = currentPosition - 1; 
    }
    if(filledLeft()){
    // if(currentTetro.some(i => cellsArray[currentPosition + i].classList.contains('stop'))){
        console.log(`b${currentPosition}`);
        currentPosition = currentPosition + 1;
        console.log(`a${currentPosition}`);   
    };
    render();
};

// Move-Right

function filledRight(){
    return  currentTetro.some(function(i){
          console.log(`${cellsArray[currentPosition + i ].classList.contains('stop')}`);
          return cellsArray[currentPosition + i ].classList.contains('stop');
      });
};

function rightDecider(){
    return currentTetro.some(function(i){
    //   console.log('leftDecider run');-------
      return (currentPosition + i) % bWidth === (bWidth-1);
    });
};

function rightMove(){
    unRender();
    if(!rightDecider()){
        currentPosition = currentPosition + 1; 
    }
    if(filledRight()){
    // if(currentTetro.some(i => cellsArray[currentPosition + i].classList.contains('stop'))){
        console.log(`b${currentPosition}`);
        currentPosition = currentPosition - 1;
        console.log(`a${currentPosition}`);  
    };
    render();
};
function downMove(){
    unRender();
    currentPosition = currentPosition + bWidth;
    render();
}

// Rotate

function checkEdge(){
    if((currentPosition + 1) % bWidth < 4 ){
        while(rightDecider()){
            currentPosition = currentPosition +1;
        }
    }
    else if( currentPosition % bWidth >5){
        while(leftDecider()){
            currentPosition = currentPosition -1;
        }
    }
}

function rotate(){
    unRender();
    if(currentRoatation<3){
        currentRoatation = currentRoatation +1;
    }
    else{
        currentRoatation = 0;
    }
    currentTetro = tetros[random][currentRoatation];
    checkEdge();
    render();
}

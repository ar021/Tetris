const gameBoard = document.querySelector('.game-board');
let cellsArray = Array.from(document.querySelectorAll('.game-board div'));
const playBtn = document.querySelector('.play-button');
// const instructionBtn = document.querySelector('.btn-c');
const scoreDisplay = document.querySelector('.score-display .score');
const linesDisplay = document.querySelector('.score-display .lines');
const statusDisplay = document.querySelector('.score-display .status');
let intervalId;


// console.log(gameBoard);
// console.log(cellsArray);
let score = 0;
let lines = 0;
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

playBtn.addEventListener('click', function(){
    document.addEventListener('keydown',controls);
    if(playBtn.innerText === 'Play/Pause'){
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          } else {
            render();
            intervalId = setInterval(moveDown, 750);
          //   random = Math.floor(Math.random() * tetros.length);
            nextRender();
          }
    }
    else{
        document.addEventListener('keydown',controls);
        clearGameBoard();
        currentPosition = 6;
        random = Math.floor(Math.random() * tetros.length);
        currentTetro = tetros[random][currentRoatation];
        render();
        nextRender();
        intervalId = setInterval(moveDown, 750);
        playBtn.innerText = 'Play/Pause'
        score = 0;
        lines = 0;
    }
    
});


document.addEventListener('keydown',controls);
function controls(e){
    if(e.key === 'ArrowLeft'){
        // console.log(`Key${e.code} has pressed`);
        leftMove();
    }
    if(e.key === 'ArrowRight'){
        // console.log(`Key${e.code} has pressed`);
        rightMove();
    }
    if(e.key === 'ArrowDown'){
        // console.log(`Key${e.code} has pressed`);
        downMove();
    }
    if(e.key === 'ArrowUp'){
        // console.log(`Key${e.code} has pressed`);
        e.preventDefault();
        rotate();
    }
    return;
}






// Function

// let intervalId = window.setInterval(function(){
//     moveDown();
// }, 500);

function render(){
    // console.log('render run');
    currentTetro.forEach(function(i){
        console.log(random);
        if (random === 0){
            cellsArray[currentPosition + i].classList.add('cell-l'); 
        }
        if (random === 1){
            cellsArray[currentPosition + i].classList.add('cell-i'); 
        }
        if (random === 2){
            cellsArray[currentPosition + i].classList.add('cell-t'); 
        }
        if (random === 3){
            cellsArray[currentPosition + i].classList.add('cell-z'); 
        }
        if (random === 4){
            cellsArray[currentPosition + i].classList.add('cell-o'); 
        }
        return;
        // cellsArray[currentPosition + i].classList.add('cell');
    });

}
// render();

function unRender(){
    // console.log('unRender run');
    currentTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.remove('cell-l','cell-i','cell-t','cell-z','cell-o');
    });
}
// unRender();

function moveDown(){
    // console.log('movedown run');--------
    unRender();
    // console.log(lTetro);
    // console.log(`before ${currentPosition}`);
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




function stopDecider(){
    return currentTetro.some(function(i){
      // return cellsArray[currentPosition + i + w].hasAttribute('class','stop');
      // console.log(cellsArray[currentPosition + i + w]);
      // console.log('stopDecider run'); -----
      return cellsArray[currentPosition + i + bWidth].classList.contains('stop');
      });
};

function stop(){
    // console.log('stop run');-----------
    
    if(stopDecider()){
        currentTetro.forEach(function(i){
            cellsArray[currentPosition + i].classList.add('stop');
        });
        currentPosition = 6;
        random = Math.floor(Math.random() * tetros.length);
        currentTetro = tetros[random][currentRoatation];
        scoreRow();
        gameOver();
        render();
        nextUnRender();
        nextRender();
        
         
    }
}
stop();

// Move - Left

function filledLeftCell(){
    return  currentTetro.some(function(i){
        //   console.log(`${cellsArray[currentPosition + i ].classList.contains('stop')}`);
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
    if(filledLeftCell()){
    // if(currentTetro.some(i => cellsArray[currentPosition + i].classList.contains('stop'))){
        console.log(`b${currentPosition}`);
        currentPosition = currentPosition + 1;
        console.log(`a${currentPosition}`);   
    };
    render();
    stop();
};

// Move-Right

function filledRightCell(){
    return  currentTetro.some(function(i){
        //   console.log(`${cellsArray[currentPosition + i ].classList.contains('stop')}`);
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
    if(filledRightCell()){
    // if(currentTetro.some(i => cellsArray[currentPosition + i].classList.contains('stop'))){
        console.log(`b${currentPosition}`);
        currentPosition = currentPosition - 1;
        console.log(`a${currentPosition}`);  
    };
    render();
    stop();
};

function downMove(){
    unRender();
    currentPosition = currentPosition + bWidth;
    
    render();
    stop();

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

// Score rows
let currentRow;

function scoreRow(){
    for (i = 0; i < 200; i += 10) {
        const filledrow = [i, i+1, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
        let scoreRowDecider = filledrow.every(index => cellsArray[index].classList.contains('stop'));
        if (scoreRowDecider) {
          score = score + 100;
          lines = lines + 1;
          scoreDisplay.innerHTML = score;
          linesDisplay.innerHTML = lines;
       
        filledrow.forEach(index => {
            cellsArray[index].classList.remove('stop','cell-l','cell-i','cell-t','cell-z','cell-o');
        })
          const cellsRemoved = cellsArray.splice(i, bWidth)
          cellsArray = cellsRemoved.concat(cellsArray)
          cellsArray.forEach(cell => gameBoard.appendChild(cell))
        }
      }



    // for(let i=0; i<199; i=i+10){
    //     console.log('run');
    //     const filledRow = [i, i+1, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
    //     // for(let j=0; j<bWidth; j++){
    //     //     filledRow.push(i+j);
    //     // }
    //     let scoreRowDecider = filledRow.every(function(i){
    //         cellsArray[i].classList.contains('stop');
    //     });
    //     console.log(scoreRowDecider);
    //     if(scoreRowDecider){
    //         score = score + 100;
    //         console.log(score);
    //     }
    // }

//     console.log(currentPosition);
//     let n = parseInt(currentPosition/bWidth) * bWidth;
//     let m = n + bWidth;
//     let currentRowArray= [];
//     for ( n; n < m; n++){
//         const occupied = cellsArray[n].classList.contains('stop');
//         currentRowArray.push(occupied);
//     }
//     console.log(`${n},,${m}...${currentRowArray}`);
}

//Game Over function

function gameOver(){
    function gameOverDecider(){
        return currentTetro.some(function(i){
            return cellsArray[currentPosition + i].classList.contains('stop');
        });
    };
    if(gameOverDecider()){
        console.log('GAME OVER');
        statusDisplay.innerText = 'GAME OVER';
        statusDisplay.classList.add('game-over');
        document.removeEventListener('keydown',controls);
        clearInterval(intervalId);
        
        playBtn.innerText = 'Play Again';
        playBtn.classList.add('play-again');

    }
}
function clearGameBoard (){
    for( let i=0; i<200; i++){
        cellsArray[i].classList.remove('stop','cell-l','cell-i','cell-t','cell-z','cell-o');
    }
    nextUnRender();
    scoreDisplay.innerHTML = 0;
    linesDisplay.innerHTML = 0;
    statusDisplay.innerText = 'YOUR SCORE';
    statusDisplay.classList.remove('game-over');
    playBtn.classList.remove('play-again');
    // for( let i=0; i<17; i++){
    //     nextCellsArray[i].classList.remove('stop','cell-l','cell-i','cell-t','cell-z','cell-o');
    // }
    // cellsArray.forEach(function(i){
    //     if(i < 200){
    //         i.classList.remove('stop','cell-l','cell-i','cell-t','cell-z','cell-o')
    //     }
    // });
    // nextCellsArray.forEach(function(i){
    //     i.classList.remove('stop','cell-l','cell-i','cell-t','cell-z','cell-o')
    // });
}



// Next Tetro Display-------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

const nextCellsArray = Array.from(document.querySelectorAll('.next-game-board div'));
const nextBWidth = 4;
const nextTetros = [[1, nextBWidth + 1, nextBWidth * 2 + 1, 2],[1, nextBWidth + 1, nextBWidth * 2 + 1, nextBWidth * 3 + 1],[1, nextBWidth, nextBWidth + 1, nextBWidth + 2],[0, nextBWidth, nextBWidth + 1, nextBWidth * 2 + 1],[0, 1, nextBWidth, nextBWidth + 1]];
let nextPosition = 0;
let nextTetro = nextTetros[random];

function nextRender(){
    nextTetro = nextTetros[random];
    nextTetro.forEach(function(i){
        console.log(i);
        if (random === 0){
            nextCellsArray[ nextPosition + i].classList.add('cell-l'); 
        }
        if (random === 1){
            nextCellsArray[ nextPosition + i].classList.add('cell-i'); 
        }
        if (random === 2){
            nextCellsArray[ nextPosition + i].classList.add('cell-t'); 
        }
        if (random === 3){
            nextCellsArray[ nextPosition + i].classList.add('cell-z'); 
        }
        if (random === 4){
            nextCellsArray[ nextPosition + i].classList.add('cell-o'); 
        }
        return;
        // nextCellsArray[nextPosition + i].classList.add('cell');
        // console.log(i.classList);
    });
}

function nextUnRender(){
    nextCellsArray.forEach(function(ie){
        ie.classList.remove('cell-l','cell-i','cell-t','cell-z','cell-o');
        // console.log(ie.classList);
    });
}


// function unRender(){
//     // console.log('unRender run');
//     nextTetros.forEach(function(i){
//         cellsArray[].classList.remove('cell');
//     });
// }


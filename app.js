const gameBoard = document.querySelector('.game-board');
let cellsArray = Array.from(document.querySelectorAll('.game-board div'));
console.log(gameBoard);
console.log(cellsArray);

const bWidth = 10;
let currentPosition = 4;

// Tetros
const lTetro = [1,1+bWidth, 1+(bWidth*2), 2+(bWidth*2)];
console.log(lTetro);

// Function
function render(){
    console.log('render run');
    lTetro.forEach(function(i){
        cellsArray[currentPosition + i].classList.add('cell');
    });

}
render();

function unRender(){
    console.log('unRender run');
    lTetro.forEach(function(i){
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
      return lTetro.some(function(i){
        // return cellsArray[currentPosition + i + w].hasAttribute('class','stop');
        // console.log(cellsArray[currentPosition + i + w]);
        console.log('stopDecider run');
        return cellsArray[currentPosition + i + bWidth].classList.contains('stop');
        });
    };
    if(stopDecider()){
        lTetro.forEach(function(i){
            cellsArray[currentPosition + i].classList.add('stop');
        });
        currentPosition = 4;
        render();
    }
    return;
}

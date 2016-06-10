/**
 * Tic Tac Toe in HTML/JavaScript/CSS
 */
var N_SIZE = 3,
  turn = 'X',
  moves = 0,
  score = {'X': 0, 'O': 0};

/**
 * Initialize board
 */
function init(){
  var board = document.createElement('table');
  board.setAttribute('border', 1); //figure out how to do this elswhere
  board.setAttribute('cellspacing', 0);
  for(var i =0; i< N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.classList.add('row'+ i, 'col' + j);
      if(i==j){
        cell.classList.add('diagonal0');
      }
      if(i === N_SIZE - 1 - j){
        cell.classList.add('diagonal1');
      }
      cell.addEventListener('click', set);
      row.appendChild(cell);
    }
  }
  document.getElementById('score').innerHTML = 'X: ' + score['X'] + ' O:' + score['O'];
  document.getElementById('tictactoe').appendChild(board);
}

/**
 * Setting play
 */
function set(){
  // cover case if someone clicks multiple times
  if(this.innerHTML){
    return;
  }
  this.innerHTML = turn;
  moves++;
  if(win(this)){
    score[turn]++;
    document.getElementById('score').innerHTML = 'X: ' + score['X'] + ' O:' + score['O'];
    alert(turn + ' won');
    startNewGame();
  } else if(moves === N_SIZE * N_SIZE) {
    alert('tie');
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').innerHTML = 'Player '+turn + '\'s turn'
  }

}

/**
 * Check for winning play
 */
function win(clickedCell) {
  var memberOf = clickedCell.classList;
  for(var i =0; i< memberOf.length; i++) {
    var elements = document.querySelectorAll('.' + memberOf[i]);
    var count =0;
    for(var j =0; j < elements.length; j++) {
      if(elements[j].innerHTML === clickedCell.innerHTML) {
        count++
      }
      if(count === N_SIZE) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Start new game
 */
function startNewGame() {
  turn = 'X';
  moves = 0;
  var board = Array.prototype.slice.call(document.getElementById('tictactoe').getElementsByTagName("TD"));
  board.forEach(function(cell){
    cell.innerHTML = '';
  });
  document.getElementById('turn').innerHTML = 'Player '+turn + '\'s turn'
}

/**
 * If user wants to set grid to specific dimensions
 */
function setGrid(){
  var gridDim = document.getElementById('gridDim').value;
  var board = document.getElementById('tictactoe');
  board.removeChild(board.firstChild);
  N_SIZE = parseInt(gridDim);
  init();
}

init();


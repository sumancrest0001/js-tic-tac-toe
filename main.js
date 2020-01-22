
  const dom = {
    setPlayersButton: document.getElementsByClassName('submit-button'),
    newGameButton: document.getElementsByClassName('new-game-button'),
    cell1: document.getElementById('cell-1'),
    cell2: document.getElementById('cell-2'),
    cell3: document.getElementById('cell-3'),
    cell4: document.getElementById('cell-4'),
    cell5: document.getElementById('cell-5'),
    cell6: document.getElementById('cell-6'),
    cell7: document.getElementById('cell-7'),
    cell8: document.getElementById('cell-8'),
    cell9: document.getElementById('cell-9'),
    p1NameScore: document.getElementById('p1-name-score'),
    p2NameScore: document.getElementById('p2-name-score'),
    p1Score: document.getElementById('p1-score'),
    p2Score: document.getElementById('p2-score'),
  };

  const gameBoard = {
    cell1: dom.cell1,
    cell2: dom.cell2,
    cell3: dom.cell3,
    cell4: dom.cell4,
    cell5: dom.cell5,
    cell6: dom.cell6,
    cell7: dom.cell7,
    cell8: dom.cell8,
    cell9: dom.cell9,
    val1: dom.cell1.dataset.value,
    val2: dom.cell2.dataset.value,
    val3: dom.cell3.dataset.value,
    val4: dom.cell4.dataset.value,
    val5: dom.cell5.dataset.value,
    val6: dom.cell6.dataset.value,
    val7: dom.cell7.dataset.value,
    val8: dom.cell8.dataset.value,
    val9: dom.cell9.dataset.value,
  };

  const getPlayers = {
    player1Name: document.getElementById('player-1-name').value,
    player1Sym: document.getElementById('player-1-symbol').value,
    player2Name: document.getElementById('player-2-name').value,
    player2Sym: document.getElementById('player-2-symbol').value,
  };

const player = (name, symbol) => {
  const playerChoices= [];
  return {name, symbol, playerChoices};
};

let setPlayers = function() {
  const player1 = player(getPlayers.player1Name, getPlayers.player1Sym);
  const player2 = player(getPlayers.player2Name, getPlayers.player2Sym);
  return {player1, player2};
}

const gameBoardArr = [ 'x', 'x', 'o', '', '', '', '', '', ''];

function displaySym () {
  gameBoard.cell1.textContent = gameBoardArr[0];
  gameBoard.cell2.textContent = gameBoardArr[1];
  gameBoard.cell3.textContent = gameBoardArr[2];
  gameBoard.cell4.textContent = gameBoardArr[3];
  gameBoard.cell5.textContent = gameBoardArr[4];
  gameBoard.cell6.textContent = gameBoardArr[5];
  gameBoard.cell7.textContent = gameBoardArr[6];
  gameBoard.cell8.textContent = gameBoardArr[7];
  gameBoard.cell9.textContent = gameBoardArr[8];
}

function selectCell(event) {
  let x = event.currentTarget;
  console.log(x);
}

const allCells = document.querySelector('.cell');
for(let i = 0; i < allCells.length; i++){
  // Console: print the clicked <p> element
  allCells[i].addEventListener('click', selectCell, false);
}

displaySym();

const gameLogic = function() {

  const eventHandler = function(){
     dom.setPlayersButton.addEventListener('click', setPlayers);
  };


};

const demo = gameLogic.setPlayers;
//console.log(demo);


const player = (name, symbol, isTurn = false) => {
  playerChoices = [];
  return {name, symbol, isTurn, playerChoices};
};

let UIController = (function(){
  const dom = {
    setPlayersButton: document.querySelector('.submit-button'),
    newGameButton: document.querySelector('.new-game-button'),
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

  return {
     displaySym: function(gameBoardArr) {
      gameBoard.cell1.textContent = gameBoardArr[0];
      gameBoard.cell2.textContent = gameBoardArr[1];
      gameBoard.cell3.textContent = gameBoardArr[2];
      gameBoard.cell4.textContent = gameBoardArr[3];
      gameBoard.cell5.textContent = gameBoardArr[4];
      gameBoard.cell6.textContent = gameBoardArr[5];
      gameBoard.cell7.textContent = gameBoardArr[6];
      gameBoard.cell8.textContent = gameBoardArr[7];
      gameBoard.cell9.textContent = gameBoardArr[8];
    },
    getPlayers: function(){
      return{
        player1Name: document.getElementById('player-1-name').value,
        player1Sym: document.getElementById('player-1-symbol').value,
        player2Name: document.getElementById('player-2-name').value,
        player2Sym: document.getElementById('player-2-symbol').value,
      };
    },

    displayPlayerInfo: function(players){
      dom.p1NameScore.textContent = `${players.player1Name}(${players.player1Sym})`;
      dom.p2NameScore.textContent = `${players.player2Name}(${players.player2Sym})`;
    },

    displayWnner: function(winner){
      alert(`Congratulation ${winner.name} ! You won the game`);
    },

    getDOMstrings: function(){
      return dom;
    }

  };
})();

let gameLogic = (function(UICtrl){
  const DOM = UICtrl.getDOMstrings();
  const gameBoardArr = [ '', '', '', '', '', '', '', '', ''];
  let player1, player2, current;
  let eventHandler = function(){
    DOM.setPlayersButton.addEventListener('click', setPlayers);
    const allCells = document.querySelector('.board');
    allCells.addEventListener('click', selectCell);
  };
  
  const createPlayers = function(playersInfo){
    player1 = player(playersInfo.player1Name, playersInfo.player1Sym, true);
    player2 = player(playersInfo.player2Name, playersInfo.player2Sym);

  };

  const setPlayers = function(){
    const inputs = UICtrl.getPlayers();
    createPlayers(inputs);
    UICtrl.displayPlayerInfo(inputs);
  };

  const currrentPlayer = () => {
   current = player1.isTurn === true ? player1 : player2;
  };


  const togglePlayer = () => {
    if(current === player1) {
      player1.isTurn = false;
      player2.isTurn = true;
    } else {
      player2.isTurn = false;
      player1.isTurn = true;
    }
  };

  const selectCell = function(event) {
    if (event.target.className === 'cell') {
    const clickedCell = event.target.dataset.value;
    currrentPlayer();
    gameBoardArr[clickedCell - 1] = current.symbol;
    current.playerChoices.push(clickedCell);
    UICtrl.displaySym(gameBoardArr);
    determineWinner();
    togglePlayer();
    }
  };

  const determineWinner = function() {
    const x = checkWinner();
    if(x === true) {
      UICtrl.displayWnner(current);
    }

  };

  const checkWinner = function() {
    const winingComposition = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'], ['2', '5', '8'], ['3', '6', '9'], ['4', '5', '6'], ['7', '8', '9'], ['3', '5', '7']];
    for(let item of winingComposition) {
      let count = 0;
      for(let i = 0; i < 3; i++) {
        if(current.playerChoices.includes(item[i])) {
          count++;
        }
      }
      if (count == 3){
        return true;
      }
    }
  };

  return {
    init: function(){
      UICtrl.displaySym(gameBoardArr);
      eventHandler();
    }
  };

})(UIController);

gameLogic.init();
 /*const player = (name, symbol) => {
  const playerChoices= [];
  return {name, symbol, playerChoices};
};

let setPlayers = function() {
  const player1 = player(getPlayers.player1Name, getPlayers.player1Sym);
  const player2 = player(getPlayers.player2Name, getPlayers.player2Sym);
  return {player1, player2};
}

const gameBoardArr = [ 'x', 'x', 'o', '', '', '', '', '', ''];



function selectCell(event) {
  if (event.target.className === 'cell') {
	gameBoard[event.target.dataset.value] = player.symbol;
	displaySym();
  };
}



displaySym();

const gameLogic = function() {

  const eventHandler = function(){
     dom.setPlayersButton.addEventListener('click', setPlayers);
  };


};

const demo = gameLogic.setPlayers;
//console.log(demo); */

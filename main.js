
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
    form: document.querySelector('.input-form'),
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

    getDOMstrings: function(){
      return dom;
    }
  };
})();

let gameLogic = (function(UICtrl){
  const DOM = UICtrl.getDOMstrings();
  let gameBoardArr = [ '', '', '', '', '', '', '', '', ''];
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
    DOM.form.reset();
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
    UICtrl.displaySym(gameBoardArr);
    togglePlayer();
    console.log(gameBoardArr[0  ])
    }
  };

  const resetBoard = () => {
    gameBoardArr = [ '', '', '', '', '', '', '', '', ''];
  };

  const checkWinner = (gameBoardArr) => {
    string = gameBoardArr.split('');
    if (string === winnerXComb) {
      if (player1.symbol === 'X') {
         `Congratulations! ${player1Name} wins!`
      } else {
         `Congratulations! ${player2Name} wins!`
      } else if (string === winnerOComb) {
        if (player1.symbol === 'O') {
           `Congratulations! ${player1Name} wins!`
        } else {
           `Congratulations! ${player2Name} wins!`
        }
      }
    }
  }

//   const winnerXComb = (current) => {
//     string = gameBoardArr.split('');
//     if ( gameBoardArr.slice(0,3) === [`${current.symbol}`, `${current.symbol}`, `${current.symbol}`] ||
//          gameBoardArr.slice(3,3) == [`${current.symbol}`, `${current.symbol}`, `${current.symbol}`] ||
//          gameBoardArr.slice(6,3) == [`${current.symbol}`, `${current.symbol}`, `${current.symbol}`] ||
//          gameBoardArr == [`${current.symbol}`, /./, /./, `${current.symbol}`]

// )
  return {
    init: function(){
      UICtrl.displaySym(gameBoardArr);
      eventHandler();
    }
  };

})(UIController);

gameLogic.init();

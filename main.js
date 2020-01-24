
const player = (name, symbol, isTurn = false, score = 0) => {
  const playerChoices = [];
  return {
    name, symbol, isTurn, playerChoices, score,
  };
};

const UIController = (() => {
  const dom = {
    setPlayersButton: document.querySelector('.submit-button'),
    newGameBtn: document.querySelector('.new-round-button'),
    resetGameBtn: document.querySelector('.reset-game-button'),
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
    p1Section: document.querySelector('.player-1'),
    p2Section: document.querySelector('.player-2'),
    board: document.querySelector('.board'),
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
    displaySym(gameBoardArr) {
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

    getPlayers() {
      const player1Name = document.getElementById('player-1-name').value;
      const player1Sym = document.getElementById('player-1-symbol').value;
      const player2Name = document.getElementById('player-2-name').value;
      const player2Sym = document.getElementById('player-2-symbol').value;
      document.querySelector('.player-1').classList.add(`${player1Name}`);
      document.querySelector('.player-2').classList.add(`${player2Name}`);
      return {
        player1Name, player1Sym, player2Sym, player2Name,
      };
    },

    displayPlayerInfo(players = null) {
      if(players === null) {
        dom.p1NameScore.textContent = 'player1';
        dom.p2NameScore.textContent = 'player2';
      } else {
        dom.p1NameScore.textContent = `${players.player1Name}(${players.player1Sym})`;
        dom.p2NameScore.textContent = `${players.player2Name}(${players.player2Sym})`;
      }
    },

    displayResult(result) {
      if (result === true) {
        alert('This is a draw');
      } else {
        alert(`Congratulations ${result.name}! You won the game`);
      }
    },

    displayScore(player1, player2) {
      dom.p1Score.textContent = player1;
      dom.p2Score.textContent = player2;
    },

    changePlayer(curPlayer, anotherPlayer) {
      document.querySelector(`.${curPlayer.name}`).classList.toggle('active-player');
      document.querySelector(`.${anotherPlayer.name}`).classList.toggle('active-player');
    },

    getDOMstrings() {
      return dom;
    },

  };
})();

const gameLogic = ((UICtrl) => {
  const DOM = UICtrl.getDOMstrings();
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];
  let player1; let player2; let current; let passivePlayer;
  let counter = 0;

  const createPlayers = function (playersInfo) {
    player1 = player(playersInfo.player1Name, playersInfo.player1Sym, true);
    player2 = player(playersInfo.player2Name, playersInfo.player2Sym);
  };

  const setPlayers = function () {
    const inputs = UICtrl.getPlayers();
    createPlayers(inputs);
    UICtrl.displayPlayerInfo(inputs);
    UICtrl.displayScore(player1.score, player2.score);
  };

  const currentPlayer = () => {
    current = player1.isTurn === true ? player1 : player2;
    passivePlayer = current === player2 ? player1 : player2;
  };

  const togglePlayer = () => {
    counter++;
    if (current === player1) {
      player1.isTurn = false;
      player2.isTurn = true;
    } else {
      player2.isTurn = false;
      player1.isTurn = true;
    }
  };

  const checkWinner = () => {
    const winingComposition = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'], ['2', '5', '8'], ['3', '6', '9'], ['4', '5', '6'], ['7', '8', '9'], ['3', '5', '7']];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of winingComposition) {
      let count = 0;
      for (let i = 0; i < 3; i += 1) {
        if (current.playerChoices.includes(item[i])) {
          count += 1;
        }
      }
      if (count === 3) {
        return true;
      }
    } return false;
  };

  const checkDraw = () => {
    if (!gameBoardArr.includes('') && checkWinner() !== true) {
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    gameBoardArr = ['', '', '', '', '', '', '', '', ''];
  };

  const result = () => {
    if (counter >= 5 && checkWinner() === true) {
      UICtrl.displayResult(current);
      current.score += 1;
      UICtrl.displayScore(player1.score, player2.score);
    } else if (counter === 9 && checkDraw() === true) {
      UICtrl.displayResult(true);
    }
  };

  const resetValues= ()=> {
    counter = 0;
    player1.isTurn = true;
    player2.isTurn = false;
    player1.playerChoices = [];
    player2.playerChoices = [];
  };

  const newRound = () => {
    resetBoard();
    resetValues();
    UICtrl.displaySym(gameBoardArr);
    UICtrl.displayScore(player1.score, player2.score);
  };

  const resetGame = () => {
    player1 = {};
    console.log(player1)
    player2 = {};
    resetBoard();
    counter = 0;
    init();
    UICtrl.displayScore(0, 0);
    UICtrl.displayPlayerInfo();
  };

  const playerSelection = (event) => {
    if (event.target.className === 'cell') {
      const clickedCell = event.target.dataset.value;
      currentPlayer();
      gameBoardArr[clickedCell - 1] = current.symbol;
      current.playerChoices.push(clickedCell);
      UICtrl.displaySym(gameBoardArr);
      setTimeout(() => {
        result();
      }, 20);
      togglePlayer();
      UICtrl.changePlayer(current, passivePlayer);
    }
  };

  // const playerSelection = (event) => {
  //   if (event.target.className === 'cell') {
  //     const clickedCell = event.target.dataset.value;
  //     currentPlayer();
  //     gameBoardArr[clickedCell - 1] = current.symbol;
  //     current.playerChoices.push(clickedCell);
  //   }
  // };

  // const gameOn = (event) => {
  //   playerSelection(event);
  //   currentPlayer();
  //   UICtrl.displaySym(gameBoardArr);
  //   result();
  //   togglePlayer();
  //   UICtrl.changePlayer(current, passivePlayer);
  // };

  const eventHandler = () => {
    DOM.setPlayersButton.addEventListener('click', setPlayers);
    DOM.board.addEventListener('click', playerSelection);
    DOM.newGameBtn.addEventListener('click', newRound);
    DOM.resetGameBtn.addEventListener('click', resetGame);
  };

  const init = () => {
    UICtrl.displaySym(gameBoardArr);
    eventHandler();
    // gameOn();
  };

  return {
    init
  };

})(UIController);

gameLogic.init();

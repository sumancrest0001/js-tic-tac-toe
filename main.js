
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
    form: document.querySelector('.input-form'),
    messages: document.getElementById('messages'),
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
      const [a, b, c, d, e, f, g, h, i] = [...gameBoardArr];
      gameBoard.cell1.textContent = a;
      gameBoard.cell2.textContent = b;
      gameBoard.cell3.textContent = c;
      gameBoard.cell4.textContent = d;
      gameBoard.cell5.textContent = e;
      gameBoard.cell6.textContent = f;
      gameBoard.cell7.textContent = g;
      gameBoard.cell8.textContent = h;
      gameBoard.cell9.textContent = i;
    },

    getPlayers() {
      const player1Name = document.getElementById('player-1-name').value;
      const player1Sym = document.getElementById('player-1-symbol').value.toUpperCase();
      const player2Name = document.getElementById('player-2-name').value;
      const player2Sym = document.getElementById('player-2-symbol').value.toUpperCase();
      document.querySelector('.player-1').classList.add(`${player1Name}`);
      document.querySelector('.player-2').classList.add(`${player2Name}`);
      return {
        player1Name, player1Sym, player2Sym, player2Name,
      };
    },

    validatePlayerSymbol() {
      if ((this.getPlayers().player1Sym === this.getPlayers().player2Sym)
      || (this.getPlayers().player1Sym.length > 1 || this.getPlayers().player2Sym.length > 1)) {
        dom.messages.classList.add('alert-message');
        dom.messages.textContent = 'Choose a one letter symbol';
        return false;
      }
      document.getElementById('player-1-symbol').classList.toggle('delete-alert');
      dom.messages.classList.toggle('invisible');
      return true;
    },

    displayPlayerInfo(players = null) {
      if (players === null) {
        dom.p1NameScore.textContent = 'player1';
        dom.p2NameScore.textContent = 'player2';
      } else {
        dom.p1NameScore.textContent = `${players.player1Name}(${players.player1Sym})`;
        dom.p2NameScore.textContent = `${players.player2Name}(${players.player2Sym})`;
      }
    },

    displayResult(result) {
      if (result === true) {
        const message = dom.messages;
        message.textContent = 'This is a draw';
        message.classList.toggle('visible');
        message.classList.toggle('success-message');
      } else {
        const message = dom.messages;
        message.textContent = `Congratulations ${result.name}! You won the game`;
        message.classList.toggle('visible');
        message.classList.toggle('success-message');
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

    resetPlayers() {
      dom.p1Section.classList.add('active-player');
      dom.p2Section.classList.remove('active-player');
    },

    getDOMstrings() {
      return dom;
    },

    clearForm() {
      dom.form.reset();
    },

    hideForm() {
      dom.form.classList.toggle('invisible');
    },
  };
})();

const gameLogic = ((UICtrl) => {
  const DOM = UICtrl.getDOMstrings();
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];
  let player1; let player2; let current; let passivePlayer;
  let counter = 0;

  const createPlayers = (playersInfo) => {
    player1 = player(playersInfo.player1Name, playersInfo.player1Sym, true);
    player2 = player(playersInfo.player2Name, playersInfo.player2Sym);
  };

  const setPlayers = () => {
    const inputs = UICtrl.getPlayers();
    if (UICtrl.validatePlayerSymbol() === true) {
      createPlayers(inputs);
      UICtrl.displayPlayerInfo(inputs);
      UICtrl.displayScore(player1.score, player2.score);
      UICtrl.clearForm();
      UICtrl.hideForm();
    }
  };

  const currentPlayer = () => {
    current = player1.isTurn === true ? player1 : player2;
    passivePlayer = current === player2 ? player1 : player2;
  };

  const togglePlayer = () => {
    counter += 1;
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

  const resetValues = () => {
    counter = 0;
    player1.isTurn = true;
    player2.isTurn = false;
    player1.playerChoices = [];
    player2.playerChoices = [];
    UICtrl.resetPlayers();
  };

  const newRound = () => {
    resetBoard();
    resetValues();
    UICtrl.displaySym(gameBoardArr);
    UICtrl.displayScore(player1.score, player2.score);
  };

  const result = () => {
    if (counter >= 5 && checkWinner() === true) {
      UICtrl.displayResult(current);
      current.score += 1;
      UICtrl.displayScore(player1.score, player2.score);
      newRound();
    } else if (counter === 9 && checkDraw() === true) {
      UICtrl.displayResult(true);
    }
  };

  /* eslint no-restricted-globals: ["error", "event"] */
  const resetGame = () => {
    location.reload();
  };

  const cellValidation = (cell) => {
    if (gameBoardArr[cell - 1] !== '') return false;
    return true;
  };

  const playerSelection = (event) => {
    if (event.target.className === 'cell') {
      const clickedCell = event.target.dataset.value;
      currentPlayer();
      if (cellValidation(clickedCell) !== false) {
        gameBoardArr[clickedCell - 1] = current.symbol;
        current.playerChoices.push(clickedCell);
        UICtrl.displaySym(gameBoardArr);
        setTimeout(() => {
          result();
        }, 20);
        togglePlayer();
        UICtrl.changePlayer(current, passivePlayer);
      }
    }
  };

  const eventHandler = () => {
    DOM.setPlayersButton.addEventListener('click', setPlayers);
    DOM.board.addEventListener('click', playerSelection);
    DOM.newGameBtn.addEventListener('click', newRound);
    DOM.resetGameBtn.addEventListener('click', resetGame);
  };

  const init = () => {
    UICtrl.displaySym(gameBoardArr);
    eventHandler();
  };

  return {
    init,
  };
})(UIController);

gameLogic.init();

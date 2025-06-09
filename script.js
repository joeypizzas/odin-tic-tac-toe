// JS for tic tac toe

const gameboard = (function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    function resetBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = 0;
            }
        }
    }
    resetBoard();

    function getBoard() {
        return board;
    }

    function makeMove(rowMove, columnMove) {
        let isValidMove;

        if (board[rowMove][columnMove] === 0) {
            if (game.getActivePlayer().token === 1) {
                board[rowMove][columnMove] = 1;
            } else {
                board[rowMove][columnMove] = 2;
            }
            isValidMove = 1;
        } else {
            console.log("Oops! That square is already taken. Please make another move.");
            isValidMove = 0;
        }
        return isValidMove;
    }

    function printBoard() {
        console.log(board);
    }

    return {
        getBoard,
        makeMove,
        printBoard,
        resetBoard
    }
})();

const game = (function gameController() {
    const players = [
        {
            name: "Player one",
            token: 1
        },
        {
            name: "Player two",
            token: 2
        }
    ];

    function updatePlayerName(playerToUpdate, newName) {
        if (playerToUpdate === players[0].token) {
            players[0].name = newName;
        } else {
            players[1].name = newName;
        }
    }

    function resetPlayerNames() {
        players[0].name = "Player one";
        players[1].name = "Player two";
    }

    let activePlayer = players[0];
    function getActivePlayer() {
        return activePlayer;
    }

    function announceActivePlayer() {
        if (activePlayer === players[0]) {
            console.log("Player One, you're now on the clock.");
        } else {
            console.log("Player Two, you're now on the clock.");
        }
    }

    function switchPlayerTurn() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    const board = gameboard.getBoard();
    function checkWinner(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] && board[i][0] === board[i][1] + board[i][0] === board[i][2]) {
                return board[i][0];
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                return board[0][i];
            }
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return board[0][2];
        }
        return null;
    }

    function playRound(rowMove, columnMove) {
        let attemptedMoveWasValid = gameboard.makeMove(rowMove,columnMove);
        ui.removeBoard();
        ui.displayBoard();
        if (checkWinner(board)) {
            ui.announceWinner();
            if (checkWinner(board) === 2) {
                switchPlayerTurn();
            }
        } else {
            if (attemptedMoveWasValid) {
                switchPlayerTurn();
                ui.announcePlayerTurn();
            }
        }
    }

    return {
        getActivePlayer,
        switchPlayerTurn,
        playRound, 
        announceActivePlayer,
        updatePlayerName,
        resetPlayerNames
    }
})();

const ui = (function changeUI() {
    const boardArr = gameboard.getBoard();
    const gameboardElement = document.querySelector("#gameboard");
    const playerInfoContainer = document.querySelector("#player-info-container");
    
    function displayBoard() {
        for (i = 0; i < boardArr.length; i++) {
            const boardRow = document.createElement("div");
            boardRow.classList.add("board-row");
            for (j = 0; j < boardArr.length; j++) {
                const boardSquare = document.createElement("button");
                boardSquare.classList.add("board-square");
                if (boardArr[i][j] === 1) {
                    boardSquare.textContent = "X";
                } else if (boardArr[i][j] === 2) {
                    boardSquare.textContent = "O";
                }
                boardRow.appendChild(boardSquare);
            }
            gameboardElement.appendChild(boardRow);
        }
    }

    function removeBoard() {
        const boardRows = document.querySelectorAll(".board-row");
        boardRows.forEach(row => row.remove());
    }

    function newGame() {
        removeBoard();
        gameboard.resetBoard();
        game.resetPlayerNames();
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
        }
        const priorWinner = document.querySelector(".winner-announcement");
        if(priorWinner) {
            priorWinner.remove();
        }
        displayBoard();
    }

    function announcePlayerTurn() {
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
        }

        const activePlayer = game.getActivePlayer();
        const activePlayerAnnouncement = document.createElement("div");
        activePlayerAnnouncement.textContent = `It's ${activePlayer.name}'s turn. Make your move!`;
        activePlayerAnnouncement.classList.add("player-name");
        activePlayerAnnouncement.classList.add("active-player-announcement");
        playerInfoContainer.appendChild(activePlayerAnnouncement);
    }

    function announceWinner() {
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        priorActivePlayer.remove();

        const activePlayer = game.getActivePlayer();
        const winnerAccouncement = document.createElement("div");
        winnerAccouncement.classList.add("player-name");
        winnerAccouncement.classList.add("winner-announcement");
        winnerAccouncement.textContent = `${activePlayer.name} is the winner. Congratulations!`;
        playerInfoContainer.appendChild(winnerAccouncement);
    }

    return {
        displayBoard,
        newGame,
        announcePlayerTurn,
        announceWinner,
        removeBoard,
        
    }
})();

ui.displayBoard();
ui.announcePlayerTurn();

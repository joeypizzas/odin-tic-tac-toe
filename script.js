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
            name: "Player One",
            token: 1
        },
        {
            name: "Player Two",
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

    let board = gameboard.getBoard();
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
        gameboard.printBoard();
        if (checkWinner(board)) {
            if (checkWinner(board) === 1) {
                console.log("Player One wins, congratulations!");
            } else {
                console.log("Player Two wins, congratulations!");
                switchPlayerTurn();
            }
        } else {
            if (attemptedMoveWasValid) {
                switchPlayerTurn();
                announceActivePlayer();
            }
        }
    }

    return {
        getActivePlayer,
        switchPlayerTurn,
        playRound, 
        announceActivePlayer,
        updatePlayerName
    }
})();
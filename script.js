// JS for tic tac toe

const gameboard = (function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = 0;
        }
    }

    function getBoard() {
        return board;
    }

    function makeMove(rowMove, columnMove) {
        let validMove;
        let invalidMove;

        if (board[rowMove][columnMove] === 0) {
            if (game.getActivePlayer().token === 1) {
                board[rowMove][columnMove] = 1;
            } else {
                board[rowMove][columnMove] = 2;
            }
            return validMove;
        } else {
            console.log("Oops! That square is already taken. Please make another move.");
            return invalidMove;
        }
    }

    function printBoard() {
        console.log(board);
    }

    return {
        getBoard,
        makeMove,
        printBoard
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

    let activePlayer = players[0];

    function getActivePlayer() {
        return activePlayer;
    }

    function switchPlayerTurn() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    function playRound(rowMove, columnMove) {

    }

    return {
        getActivePlayer,
        switchPlayerTurn,
    }
})();
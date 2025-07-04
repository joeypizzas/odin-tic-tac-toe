// JS for tic tac toe

const gameboard = (function gameBoard() { // Gameboard factory function 
    const rows = 3;
    const columns = 3;
    const board = [];

    function resetBoard() { // initalize/reset board array 
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = 0;
            }
        }
    }

    function getBoard() {
        return board;
    }

    function makeMove(rowMove, columnMove) { // Takes move input and places it in board array 
        const dialog = document.querySelector("dialog");
        let isValidMove;

        if (!game.checkWinner(board) && !dialog.open) {
            if (board[rowMove][columnMove] === 0) {
                if (game.getActivePlayer().token === 1) {
                    board[rowMove][columnMove] = 1;
                } else {
                    board[rowMove][columnMove] = 2;
                }
                isValidMove = 1;
            } else {
                ui.announceInvalidMove();
                isValidMove = 0;
            }
        }
        return isValidMove;
    }

    return {
        getBoard,
        makeMove,
        resetBoard
    }
})();

const game = (function gameController() { // Game controller factory function 
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

    function getPlayers() {
        return players;
    }

    function updatePlayerName(playerToUpdate, newName) { // Updates player name in players array 
        if (playerToUpdate === players[0].token) {
            players[0].name = newName;
        } else {
            players[1].name = newName;
        }
    }

    function resetPlayerNames() { // Resets player names, used with new game 
        players[0].name = "Player one";
        players[1].name = "Player two";
    }

    let activePlayer = players[0]; // Active player used for controlling game 
    function getActivePlayer() {
        return activePlayer;
    }

    function switchPlayerTurn() { // Switches player turn foe game control 
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    const board = gameboard.getBoard();
    function checkWinner(board) { // Checks for 3 in a row in board or draw, used after making a move
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                console.log(board[i][0]);
                return board[i][0];
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                console.log(board[0][i]);
                return board[0][i];
            }
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return board[0][2];
        }
        for(let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 0) {
                    return null;
                }
            }
        }
        const draw = 3;
        return draw;
    }

    function playRound(rowMove, columnMove) { // Takes user input and make moves, displays winner or draw, or moves to next turn 
        let attemptedMoveWasValid = gameboard.makeMove(rowMove,columnMove);

        ui.removeBoard();
        ui.displayBoard();

        const priorWinner = document.querySelector(".winner-announcement");
        const priorDraw = document.querySelector(".draw-announcement");

        if (checkWinner(board) === 1 || checkWinner(board) === 2) {
            if (!priorWinner) {
                ui.announceWinner();
            }
        } else if (checkWinner(board) === 3) {
            if (!priorDraw) {
                ui.announceDraw();
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
        updatePlayerName,
        resetPlayerNames,
        getPlayers, 
        checkWinner
    }
})();

const ui = (function changeUI() { // UI factory function 
    const boardArr = gameboard.getBoard();
    const gameboardElement = document.querySelector("#gameboard");
    const playerInfoContainer = document.querySelector("#player-info-container");
    const titleContainer = document.querySelector("#title-container");
    const gameContainer = document.querySelector("#game-container");
    const footerContainer = document.querySelector("#footer-container");
    const dialog = document.querySelector("dialog");
    const instructions = document.querySelector("#instructions");
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");
    const newGameButton = document.querySelector("#new-game-button");
    const playerOneButton = document.querySelector("#player-one-button");
    const playerTwoButton = document.querySelector("#player-two-button");
    const dialogBackground = document.querySelectorAll(".dialog-background");
    const changeNameButton = document.querySelector("#change-name-button");
    const form = document.querySelector("form");
    
    function displayBoard() { // Adds board to UI, used initially and after each move 
        for (i = 0; i < boardArr.length; i++) {
            const boardRow = document.createElement("div");
            boardRow.classList.add("board-row");
            for (j = 0; j < boardArr.length; j++) {
                const boardSquare = document.createElement("button");
                boardSquare.classList.add("board-square");
                boardSquare.dataset.row = i;
                boardSquare.dataset.column = j;
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

    function removeBoard() { // Board removed after each move to allow for updated board
        const boardRows = document.querySelectorAll(".board-row");
        boardRows.forEach(row => row.remove());
    }

    function newGame() { // resets everything to allow for a new game 
        removeBoard();
        gameboard.resetBoard();
        game.resetPlayerNames();
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
        }
        const priorInvalidAnnouncement = document.querySelector(".invalid-announcement");
        if (priorInvalidAnnouncement) {
            priorInvalidAnnouncement.remove();
        }
        const priorWinner = document.querySelector(".winner-announcement");
        if (priorWinner) {
            priorWinner.remove();
        }
        const priorDraw = document.querySelector(".draw-announcement");
        if (priorDraw) {
            priorDraw.remove();
        }
        displayBoard();
        if (game.getActivePlayer().token === 2) {
            game.switchPlayerTurn();
        }
        announcePlayerTurn();
    }

    function announcePlayerTurn() { // Announces new turn after previous move 
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
        }
        const priorInvalidAnnouncement = document.querySelector(".invalid-announcement");
        if (priorInvalidAnnouncement) {
            priorInvalidAnnouncement.remove();
        }

        const activePlayer = game.getActivePlayer();
        const activePlayerAnnouncement = document.createElement("div");
        activePlayerAnnouncement.textContent = `It's ${activePlayer.name}'s turn. Make your move!`;
        activePlayerAnnouncement.classList.add("player-name");
        activePlayerAnnouncement.classList.add("active-player-announcement");
        playerInfoContainer.appendChild(activePlayerAnnouncement);
    }

    function announceWinner() { // Anounces winner once there is one 
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
        }
        const priorInvalidAnnouncement = document.querySelector(".invalid-announcement");
        if (priorInvalidAnnouncement) {
            priorInvalidAnnouncement.remove();
        }

        const activePlayer = game.getActivePlayer();
        const winnerAccouncement = document.createElement("div");
        winnerAccouncement.classList.add("player-name");
        winnerAccouncement.classList.add("winner-announcement");
        winnerAccouncement.textContent = `${activePlayer.name} is the winner. Congratulations!`;
        playerInfoContainer.appendChild(winnerAccouncement);
    }

    function announceInvalidMove() { // Announces bad move when one is made 
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        priorActivePlayer.remove();

        const activePlayer = game.getActivePlayer();
        const invalidAnnouncement = document.createElement("div");
        invalidAnnouncement.classList.add("player-name");
        invalidAnnouncement.classList.add("invalid-announcement");
        invalidAnnouncement.textContent = `Oops! There's already a token there. It's still ${activePlayer.name}'s move.`;
        playerInfoContainer.appendChild(invalidAnnouncement);
    }

    function announceDraw() { // Announces draw when there is one 
        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
        }
        const priorInvalidAnnouncement = document.querySelector(".invalid-announcement");
        if (priorInvalidAnnouncement) {
            priorInvalidAnnouncement.remove();
        }

        const drawAnnouncement = document.createElement("div");
        drawAnnouncement.classList.add("player-name");
        drawAnnouncement.classList.add("draw-announcement");
        drawAnnouncement.textContent = "It's a draw! Tap \"New game\" to play again.";
        playerInfoContainer.appendChild(drawAnnouncement);
    }

    function updatePlayerNamesInUI() { // Updates prior name in the UI after one is changed
        const players = game.getPlayers();

        instructions.textContent = `Win the game with three in a row in any direction. ${players[0].name} uses X. ${players[1].name} uses O.`
        playerOneName.textContent = `${players[0].name}`;
        playerTwoName.textContent = `${players[1].name}`;

        const priorActivePlayer = document.querySelector(".active-player-announcement");
        if (priorActivePlayer) {
            priorActivePlayer.remove();
            announcePlayerTurn();
        }

        const priorInvalidAnnouncement = document.querySelector(".invalid-announcement");
        if (priorInvalidAnnouncement) {
            priorInvalidAnnouncement.remove();
            announceInvalidMove();
        }

        const priorWinner = document.querySelector(".winner-announcement");
        if (priorWinner) {
            priorWinner.remove();
            announceWinner();
        }
    }

    function openDialog() { // Allows for modal to change name
        titleContainer.classList.add("blur");
        gameContainer.classList.add("blur");
        footerContainer.classList.add("blur");
        dialog.show();
        form.reset();
    }

    function closeDialog() { // Removes modal for changing name
        titleContainer.classList.remove("blur");
        gameContainer.classList.remove("blur");
        footerContainer.classList.remove("blur");
        dialog.close();
        if (playerOneButton.classList.contains("change-player-one-name")) {
            playerOneButton.classList.remove("change-player-one-name");
        }
        if (playerTwoButton.classList.contains("change-player-two-name")) {
            playerTwoButton.classList.remove("change-player-two-name");
        }
    }

    newGameButton.addEventListener("mouseover", () => {
        newGameButton.style.color = "#3F51B5";
    });
    newGameButton.addEventListener("mouseout", () => {
        newGameButton.style.color = "#FF5722";
    });
    newGameButton.addEventListener("mousedown", () => {
        newGameButton.style.color = "#FF5722";
    });
    newGameButton.addEventListener("mouseup", () => {
        newGameButton.style.color = "#3F51B5";
        newGame();
        updatePlayerNamesInUI();
    });

    gameboardElement.addEventListener("mouseover", (event) => {
        if (event.target.tagName === "BUTTON") {
            event.target.style.borderColor = "#3F51B5";
        }
    });
    gameboardElement.addEventListener("mouseout", (event) => {
        if (event.target.tagName === "BUTTON") {
            event.target.style.borderColor = "#FF5722";
        }
    });
    gameboardElement.addEventListener("mousedown", (event) => {
        if (event.target.tagName === "BUTTON") {
            event.target.style.borderColor = "#FF5722";
        }
    });
    gameboardElement.addEventListener("mouseup", (event) => {
        if (event.target.tagName === "BUTTON") {
            event.target.style.borderColor = "#3F51B5";
        }
        game.playRound(event.target.dataset.row, event.target.dataset.column);
    });

    playerOneButton.addEventListener("mouseover", () => {
        playerOneButton.style.color = "#3F51B5";
    });
    playerOneButton.addEventListener("mouseout", () => {
        playerOneButton.style.color = "#FF5722";
    });
    playerOneButton.addEventListener("mousedown", () => {
        playerOneButton.style.color = "#FF5722";
    });
    playerOneButton.addEventListener("mouseup", () => {
        playerOneButton.style.color = "#3F51B5";
        playerOneButton.classList.add("change-player-one-name");
        openDialog();
    });

    playerTwoButton.addEventListener("mouseover", () => {
        playerTwoButton.style.color = "#3F51B5";
    });
    playerTwoButton.addEventListener("mouseout", () => {
        playerTwoButton.style.color = "#FF5722";
    });
    playerTwoButton.addEventListener("mousedown", () => {
        playerTwoButton.style.color = "#FF5722";
    });
    playerTwoButton.addEventListener("mouseup", () => {
        playerTwoButton.style.color = "#3F51B5";
        playerTwoButton.classList.add("change-player-two-name");
        openDialog();
    });

    dialogBackground.forEach(container => {
        container.addEventListener("click", () => {
            closeDialog();
        });
    });

    changeNameButton.addEventListener("mouseover", () => {
        changeNameButton.style.color = "#3F51B5";
    });
    changeNameButton.addEventListener("mouseout", () => {
        changeNameButton.style.color = "#FF5722";
    });
    changeNameButton.addEventListener("mousedown", () => {
        changeNameButton.style.color = "#FF5722";
    });
    changeNameButton.addEventListener("mouseup", () => {
        changeNameButton.style.color = "#3F51B5";
        const newName = document.querySelector("input");
        if (playerOneButton.classList.contains("change-player-one-name")) {
            game.updatePlayerName(1, newName.value);
        } else if (playerTwoButton.classList.contains("change-player-two-name")) {
            game.updatePlayerName(2, newName.value);
        }
        updatePlayerNamesInUI();
        closeDialog();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    
    return {
        displayBoard,
        newGame,
        announcePlayerTurn,
        announceWinner,
        removeBoard,
        announceInvalidMove,
        openDialog,
        closeDialog,
        updatePlayerNamesInUI, 
        announceDraw
    }
})();

// Initalizes game 
gameboard.resetBoard();
ui.displayBoard();
ui.updatePlayerNamesInUI();
ui.announcePlayerTurn();

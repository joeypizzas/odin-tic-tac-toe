# Planning for library project 
## Does your program have a user interface? What will it look like? What functionality will the interface have? 
- Yes. It has a user interface. 
- It'll be three sections:
    - A header with the name of the game. 
        - When someone wins/loses/ties, this is shown in the subheader. 
    - A main section with the gameboard and section explaining the rules of the game. This section shows:
        - The person who's turn it is. 
        - The ability to restart the game. 
        - The ability to change the players' names. 
        - The tic-tac-toe gameboard, with the ability for the player who's turn it is to update a square to be filled (either with an X or O depending on the player). 
    - A footer with attribution to the game's author. 
## What inputs will your program have? Will the user enter data or will you get input from somewhere else?
- The player whose turn it is. Always starts with player 1 and switches one turn at a time. 
- Game result. Comes from someone winning/losing/tying. 
- The ability to restart a game. Comes from reset game button. 
- Changing player name. Comes from field input for player name. 
- Gameboard. Comes from player moves on the gameboard. 
## Given your inputs, what are the steps necessary to return the desired output?
### Initially create game in console via JS 
1. Factory function objects, one for gameboard, one for players, and one for gamecontroller. Each one will return methods needed for various game functions. Setting them equal to variables allows those variables to access the methods from the factory function. 
    - Gameboard object:
        - Set the size of the grid and initialize the gameboard array. 
        - Create the gameboard array with a 2d loop of the correct size. Squares will have 0 unless they are filled. Otherwise 1 for player 1 or 2 for player 2. 
        - Create a function that returns the gameboard. 
        - Create a function that makes a move on the board. It takes row and column arguments, checks whether place is empty. If so, it adds the correct marker to the square. Otherwise, it returns an error indicating that the square already has a marker from the correct player. 
        - Create a function that loops through the gameboard array and prints it to the console.  
        - Returns methods to return gameboard, make move on the board, and print board to the console. 
        - IIFE
    - Gamecontroller object:
        - Players object:
        -   array of two objects. Each object stores the player name and their token.
        - Sets initial current active player to player 1. 
        - Function to switch player turn. 
        - Has a play round function. It:
            - Takes board space argument. 
            - Calls function to make a move on the board using board space argument for correct player. 
            - Calls function to print updated board to the console. 
            - Calls function to switch player turn, as long as move was valid. 
            - Checks to see if the move resulted in a win or tie for the game, and prints appropriate message to the console, if so. 
        - Function that updates player name. 
        - Returns playRound function because it's needed to play game in the console. 
        - IIFE 
2. Factory function for updating UI. 
    - Function that gets board state and writes it to the UI. 
    - Function that resets board storage and resets board in the UI. 
    - Function that announces player turn in the UI. 
    - Function that announces winner in the UI. 
    - Function that announces if square is already taken up. 
    - Function that opens modal to updater player name. 
    - Function that closes modal to update player name. 
    - Function that updates player name in the UI. 


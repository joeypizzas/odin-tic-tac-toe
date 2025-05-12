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
1. Three factory function objects, one for gameboard, one for players, and one for gamecontroller. Each one will return methods needed for various game functions. Setting them equal to variables allows those variables to access the methods from the factory function. 
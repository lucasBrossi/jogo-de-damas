# jogo-de-damas_English checkers
###### by Lucas Bueno Rossi

## Used techs:

    - Node.js;
    - Express 4;
    - Database in files (with Node FileSystem);
    - Json Web Token (Authentication routes);
    - Dotenv (create environment variable)

## How it works:

### Rules:

The game of checkers is played between two players, on a square board, of 64 alternately light and dark squares, with 12 white and 12 black pieces.

The objective is to capture or immobilize the opponent's pieces. The player who manages to capture all the enemy's pieces wins the game.

The piece moves diagonally forward, and one square at a time.

The piece can capture the opponent's piece by moving forward and also allowing you to capture the opponent's piece by moving backward.

The piece that reaches the opponent's eighth square, stopping there, will be promoted to "queen".

The queen can move backwards and forwards diagonally one square at a time, different from the other pieces, which move only forward.

Player can choose to capture any piece and not necessarily make the move that allows him to take the largest number of pieces.

### The Routes:

#### The API uses some access routes so that the user has the best possible experience with the system. They contain the famous CRUD with a semi relational database that searches the data for the same verification id.
##### The routes are:
    
    - /games
    - /moves

##### These routes are responsible for creating a game and obtaining some information about this or another game, in the case of "/games". On the other hand, "/moves" is responsible for sending the movements and checking if they are in accordance with the rules (English checkers). according to the rules, the move takes place.

### "/games":

#### The "/games" route has two methods: 

1. Post
- responsible for creating the game by setting the information with the id of player 1, the initial positions of the pieces on the board, the scoreboard and the empty "idPlayer2" to receive the second player's id. Returning to the user, the unique ID of the match and the verification token for player 2 access (a token is only useful for a game. When trying to access another game with the same token, access will be denied) 

![Board Logo](/images/boardRepresent.png)

2. Get
- responsible for finding game information, for that, it is necessary to have the game ID and the access token for the game in addition to the idPlayer2 that the user can choose as he wishes.

- If the "idPlayer2" is empty, it searches for the body and changes it in the database.

- It should return the general match data:

    - scoreboard, 
    - player's turn, 
    - layout of board pieces, 
    - the ids of each player, 
    - the match id and the possible moves of the player of the round according to the rules.

If the number of points on the score of one of the players reaches 12, the return will bring the score with the winning idPlayer.

### "/moves":

#### The "/moves" route has one method: 

1. Put
- Responsible for sending the movement chosen by the player for the round.

- The movement is compared with the possible movements according to the rules of the game and if it passes the check, then the game uses the informed movement to change the board in the database, as well as the score and the player's turn status.

- After that, the return of the api will contain the player turn, the score, and the next moves.

- If the player has made a capture, the system checks if there is a composite capture with that same piece, if it has, the player's shift will not be changed and the system will wait for the next capture movement of the current player

- If the initial movement is invalid, it returns an error: "Invalid movement"
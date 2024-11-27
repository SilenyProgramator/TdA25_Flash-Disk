var express = require('express');
const uuid = require('uuid');
var router = express.Router();


// priklad promenych pro leriho
const name = "test";
const difficulty = "test";
const gameState = "test";
const board = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"]
];


app.get('/api/v1/games/', (req, res) => {
    
    const response = [
        {
            uuid: uuid.v4(),             // vygenerovat uuid
            createdAt: new Date().toISOString(), // napsat aktualni cas
            updatedAt: new Date().toISOString(), // napsat aktualni cas
            name: name,             // napsat jmeno
            difficulty: difficulty, // napsat obtiznost
            gameState: gameState, // napsat stav hry
            board: board            // napsat stav herni plochy
        }
    ];

    // odpovedet s kodem 200 (OK)
    res.status(200).json(response);
});
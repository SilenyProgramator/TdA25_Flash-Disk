const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming your database setup is exported here
const uuid = require('uuid');

// Define the GET /api/v1/games route
router.get('/v1/games', (req, res) => {
    // Generate a new game
    const newGame = {
        uuid: uuid.v4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: "New Game", // Adjust as needed
        difficulty: "Medium", // Example value
        gameState: "In Progress",
        board: JSON.stringify([["…"]]) // A basic example board
    };

    // Insert into the database
    const sql = `
        INSERT INTO games (id, name, difficulty, gameState, board, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [
        newGame.uuid,
        newGame.name,
        newGame.difficulty,
        newGame.gameState,
        newGame.board,
        newGame.createdAt,
        newGame.updatedAt
    ], function (err) {
        if (err) {
            console.error('Error inserting game into database:', err.message);
            return res.status(500).json({ error: 'Failed to create new game.' });
        }

        // Return the newly created game
        res.status(201).json([{
            uuid: newGame.uuid,
            createdAt: newGame.createdAt,
            updatedAt: newGame.updatedAt,
            name: newGame.name,
            difficulty: newGame.difficulty,
            gameState: newGame.gameState,
            board: JSON.parse(newGame.board)
        }]);
    });
});

module.exports = router;

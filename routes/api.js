const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const db = require('../db'); // Assume this is a module that connects to your database

const router = express.Router();
router.use(bodyParser.json());

function validateBoard(board) {
    if (!Array.isArray(board) || board.length !== 15) return false;
    for (let i = 0; i < board.length; i++) {
        if (!Array.isArray(board[i]) || board[i].length !== 15) return false;
    }
    return true;
}

router.post('/games', (req, res) => {
    const { name, difficulty, board } = req.body;

    if (!name || !difficulty || !board) {
        return res.status(400).json({ code: 400, message: 'Missing required fields: name, difficulty, and board.' });
    }

    const validDifficulties = ['beginner', 'easy', 'medium', 'hard', 'extreme'];
    if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({ code: 400, message: 'Invalid difficulty level.' });
    }

    if (!validateBoard(board)) {
        return res.status(422).json({ code: 422, message: 'Invalid board format.' });
    }

    const newGame = {
        uuid: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: name,
        difficulty: difficulty,
        gameState: "opening", // Initial game state
        board: JSON.stringify(board),
    };

    const sql = `
        INSERT INTO games (uuid, name, difficulty, gameState, board, createdAt, updatedAt)
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
            return res.status(500).json({ code: 500, message: 'Failed to create new game.' });
        }

        res.status(201).json(newGame);
    });
});

router.get('/games', (req, res) => {
    const sql = 'SELECT * FROM games';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching games:', err.message);
            return res.status(500).json({ code: 500, message: 'Failed to fetch games.' });
        }

        const games = rows.map(row => ({
            uuid: row.uuid,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            name: row.name,
            difficulty: row.difficulty,
            gameState: row.gameState,
            board: JSON.parse(row.board)
        }));

        res.status(200).json(games);
    });
});

router.get('/games/:uuid', (req, res) => {
    const { uuid } = req.params;

    const sql = 'SELECT * FROM games WHERE uuid = ?';

    db.get(sql, [uuid], (err, row) => {
        if (err) {
            console.error('Error fetching game:', err.message);
            return res.status(500).json({ code: 500, message: 'Failed to fetch game data.' });
        }

        if (!row) {
            return res.status(404).json({ code: 404, message: 'Game not found.' });
        }

        const game = {
            uuid: row.uuid,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            name: row.name,
            difficulty: row.difficulty,
            gameState: row.gameState,
            board: JSON.parse(row.board)
        };

        res.status(200).json(game);
    });
});

router.put('/games/:uuid', (req, res) => {
    const { uuid } = req.params;
    const { name, difficulty, board } = req.body;

    if (!name || !difficulty || !board) {
        return res.status(400).json({ code: 400, message: 'Missing required fields: name, difficulty, and board.' });
    }

    const validDifficulties = ['beginner', 'easy', 'medium', 'hard', 'extreme'];
    if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({ code: 400, message: 'Invalid difficulty level.' });
    }

    if (!validateBoard(board)) {
        return res.status(422).json({ code: 422, message: 'Invalid board format.' });
    }

    const updatedAt = new Date().toISOString();
    const updatedBoard = JSON.stringify(board);

    const sql = `
        UPDATE games
        SET name = ?, difficulty = ?, gameState = ?, board = ?, updatedAt = ?
        WHERE uuid = ?
    `;

    db.run(sql, [name, difficulty, 'midgame', updatedBoard, updatedAt, uuid], function (err) {
        if (err) {
            console.error('Error updating game:', err.message);
            return res.status(500).json({ code: 500, message: 'Failed to update game.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ code: 404, message: 'Game not found.' });
        }

        const selectSql = 'SELECT * FROM games WHERE uuid = ?';
        db.get(selectSql, [uuid], (err, row) => {
            if (err) {
                console.error('Error fetching updated game:', err.message);
                return res.status(500).json({ code: 500, message: 'Failed to fetch updated game.' });
            }

            const game = {
                uuid: row.uuid,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                name: row.name,
                difficulty: row.difficulty,
                gameState: row.gameState,
                board: JSON.parse(row.board)
            };

            res.status(200).json(game);
        });
    });
});

router.delete('/games/:uuid', (req, res) => {
    const { uuid } = req.params;

    const sql = 'DELETE FROM games WHERE uuid = ?';

    db.run(sql, [uuid], function (err) {
        if (err) {
            console.error('Error deleting game:', err.message);
            return res.status(500).json({ code: 500, message: 'Failed to delete game.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ code: 404, message: 'Game not found.' });
        }

        res.status(204).send();
    });
});

router.get('/game', (req, res) => {
    // This is a placeholder for the main page. Replace with actual HTML content.
    res.status(200).type('html').send('<html><body>Main Page</body></html>');
});

router.get('/game/:uuid', (req, res) => {
    const { uuid } = req.params;

    // This is a placeholder for the game load page. Replace with actual HTML content.
    res.status(200).type('html').send('<html><body>Game Page: ' + uuid + '</body></html>');
});

module.exports = router;

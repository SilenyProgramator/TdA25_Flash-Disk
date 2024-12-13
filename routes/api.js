const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');

router.get('/v1/games', (req, res) => {
    const newGame = {
        uuid: uuid.v4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: "New Game", 
        difficulty: "Medium", 
        gameState: "In Progress",
        board: JSON.stringify([["…"]]) 
    };
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

router.post('/v1/games', (req, res) => {
  const { name, difficulty, board } = req.body;

  const validDifficulties = ['beginner', 'easy', 'medium', 'hard', 'extreme'];
  if (!name || !difficulty || !board) {
      return res.status(400).json({ error: 'Missing required fields: name, difficulty, and board.' });
  }

  if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level.' });
  }

  if (!Array.isArray(board) || board.length === 0) {
      return res.status(400).json({ error: 'Board must be a non-empty array.' });
  }

  const newGame = {
      uuid: uuid.v4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: name,
      difficulty: difficulty,
      gameState: "In Progress",
      board: JSON.stringify(board), 
  };
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

router.get('/v1/games/:id', (req, res) => {
  const { id } = req.params;  

  const sql = 'SELECT * FROM games WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
      if (err) {
          console.error('Error fetching game:', err.message);
          return res.status(500).json({ error: 'Failed to fetch game data.' });
      }

      if (!row) {
          return res.status(404).json({ error: 'Game not found.' });
      }

      res.status(200).json([{
          uuid: row.id,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          name: row.name,
          difficulty: row.difficulty,
          gameState: row.gameState,
          board: JSON.parse(row.board) 
      }]);
  });
});

router.put('/v1/games/:id', (req, res) => {
  const { id } = req.params; 
  const { name, difficulty, board } = req.body; 

  const validDifficulties = ['beginner', 'easy', 'medium', 'hard', 'extreme'];
  if (!name || !difficulty || !board) {
      return res.status(400).json({ error: 'Missing required fields: name, difficulty, and board.' });
  }

  if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level.' });
  }

  if (!Array.isArray(board) || board.length === 0) {
      return res.status(400).json({ error: 'Board must be a non-empty array.' });
  }

  const updatedAt = new Date().toISOString(); 
  const updatedBoard = JSON.stringify(board); 

  const sql = `
      UPDATE games 
      SET name = ?, difficulty = ?, gameState = ?, board = ?, updatedAt = ? 
      WHERE id = ?
  `;

  db.run(sql, [name, difficulty, 'In Progress', updatedBoard, updatedAt, id], function (err) {
      if (err) {
          console.error('Error updating game:', err.message);
          return res.status(500).json({ error: 'Failed to update game.' });
      }

      if (this.changes === 0) {
          return res.status(404).json({ error: 'Game not found.' });
      }

      const selectSql = 'SELECT * FROM games WHERE id = ?';
      db.get(selectSql, [id], (err, row) => {
          if (err) {
              console.error('Error fetching updated game:', err.message);
              return res.status(500).json({ error: 'Failed to fetch updated game.' });
          }

          res.status(200).json([{
              uuid: row.id,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              name: row.name,
              difficulty: row.difficulty,
              gameState: row.gameState,
              board: JSON.parse(row.board) 
          }]);
      });
  });
});


module.exports = router;

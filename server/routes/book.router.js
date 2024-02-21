const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /books
router.get('/', (req, res) => {
  const sqlText = `
    SELECT * FROM "books"
      ORDER BY "title";
  `
  
  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('error getting books', dbErr);
      res.sendStatus(500);
    });
});

// POST /books
  // Expects req.body to be shaped like:
  // {author: 'Author Name', title: 'Book Title'}
router.post('/',  (req, res) => {
  console.log(`POST /books req.body:`, req.body);
  const sqlText = `
    INSERT INTO "books"
      ("author", "title")
      VALUES
      ($1, $2);
  `
  const sqlValues = [req.body.author, req.body.title]
  
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log(`Error adding new book`, dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;

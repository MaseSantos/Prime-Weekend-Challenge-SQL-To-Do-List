const express = require('express');
const router= express.Router();
const pool = require('./pool');

//GET
router.get('/', (req, res) => {
    console.log('in router /task GET');
    let queryString = `SELECT * FROM "tasks" ORDER BY "done", "due_date" DESC, "urgency" DESC`;
    pool.query(queryString).then((result) => {
        // success
        res.send(result.rows);
    }).catch((err) => {
        // error
        res.send(500);
    })
}) 
//POST

//PUT

//DELETE

module.exports = router;
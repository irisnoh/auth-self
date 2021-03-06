const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "item" ORDER BY "id" DESC;`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'INSERT INTO "item"("description", "image_url", "user_id") VALUES ($1, $2, $3);';

    pool.query(queryText, [req.body.description, req.body.imageUrl, req.user.id])
        .then(result => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error in post', error)
            res.sendStatus(500)
        })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "item" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
    .then(() => {
        res.sendStatus(200)
    }).catch(error => {
        console.log('error in delete', error)
        res.sendStatus(500)
    })
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE "item" SET "description" = $1, "image_url" = $2 WHERE "id" = $3;';
    pool.query(queryText, [req.body.description, req.body.imageUrl, req.params.id])
    .then(() => {
        res.sendStatus(200)
    }).catch(error => {
        console.log('error in put', error)
        res.sendStatus(500)
    })
});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;
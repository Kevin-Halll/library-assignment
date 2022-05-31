const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.get('/:uId/:bId', (req, res) => {
    // db.query(`SELECT * FROM library_app.borrow_tbl`, (err, rows) => {
        db.query(`DELETE FROM library_app.borrow_tbl 
        WHERE user_id = ${req.params.uId} AND book_id = ${req.params.bId}`, (err, data) => {
            db.query(`UPDATE books_tbl SET book_qty = (book_qty + 1) WHERE id = ${req.params.bId}`, (errors, info) => {
                if(errors) throw errors;
                res.redirect('/mybooks')
            })
        })
    })
// })

module.exports = router

const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.post('/', (req, res) => {
    let sql = "INSERT INTO borrow_tbl SET ?" 
    db.query(sql, req.body, (err, results) => {
        if (err) throw err;
        db.query(`SELECT * FROM library_app.books_tbl WHERE id = ${req.body.book_id}`, (err, rows) => {
            if(err) throw err;
            db.query(`UPDATE books_tbl SET book_qty = ${rows[0].book_qty - 1} WHERE id = ${req.body.book_id}`, (errors, data) => {
                if(errors) throw errors
                req.flash('success', `${rows[0].book_title} is now reserved for you!`)
                res.redirect('back')
            })
        })
    })
})

module.exports = router

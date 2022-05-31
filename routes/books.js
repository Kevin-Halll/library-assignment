const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM library_app.borrow_tbl WHERE user_id = ${req.session.user_id};`, (errors, data) => {
        //
        db.query(`SELECT * FROM library_app.books_tbl WHERE book_cat_id = ${req.params.id}`, (err, rows) => {
            if(err) throw err;
            res.render('books-template', {
                title: 'Books',
                books: rows,
                borrowed: data,
                user: req.session.fname,
                user_id: req.session.user_id
            })
        })
    })

	
})

module.exports = router

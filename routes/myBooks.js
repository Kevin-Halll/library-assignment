const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.get('/', (req, res) => {
    db.query(`SELECT * FROM library_app.books_tbl bt, library_app.borrow_tbl bor WHERE bor.user_id = ${req.session.user_id} AND bor.book_id = bt.id;`, (err, data) => {
        if(err) throw err;
        res.render('myBooks-template', {
            title: 'My Books',
            myBooks: data,
            user: req.session.fname,
            user_id: req.session.user_id
        })
    })

	
})

module.exports = router

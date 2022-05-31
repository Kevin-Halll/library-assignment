const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.get('/', (req, res) => {
    db.query(`SELECT * FROM library_app.borrow_tbl bor JOIN library_app.users_tbl ut 
    JOIN library_app.books_tbl bt ON bor.user_id = ut.id AND 
    bor.book_id = bt.id ORDER BY ut.fname;`, (err, rows) => {
        res.render('admin-template', {
            title: 'Admin Dashboard',
            data: rows,
            user: req.session.fname
        })
    })

	
})

module.exports = router

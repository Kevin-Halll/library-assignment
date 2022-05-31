const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.get('/', (req, res) => {
	db.query('SELECT * FROM library_app.book_categories_tbl', (err, rows) => {
		if(req.session.fname) {
            res.render('categories-template', { 
                page_title: 'Home',
                categories: rows,
                user: req.session.fname
            })
        }else {
            req.flash('error', 'Please Sign in to Proceed!')
            res.redirect('/')
        }
		// res.send(rows)
	})
})

module.exports = router

const express = require('express')
const router = express.Router()
const db = require("../lib/db")

router.get('/', (req, res) => {
	res.render('index', { page_title: 'Home', user: req.session.fname})
})

router.post("/", (req, res) => {
	let data = [req.body.email, req.body.password];
  
	let sql = `SELECT * FROM library_app.users_tbl WHERE email = ? AND password = ?;`;
	db.query(sql, data, (err, rows) => {
	  if (rows.length <= 0) {
		  res.redirect('back')
		  return
	  }
	  req.session.is_loggedin = true;
	  req.session.fname = rows[0].fname;
	  req.session.lname = rows[0].lname;
	  req.session.email = rows[0].email;
	  req.session.user_id = rows[0].id;
	  req.session.role = rows[0].role;

	  console.log(req.session.fname);
	  res.redirect("/categories");
	});
  });

  router.get('/logout', (req, res) => {
	  req.session.destroy()
	  res.redirect('/')
  })
module.exports = router

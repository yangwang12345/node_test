const express = require('express'),
	router = express.Router(),
	sql = require('mysql');

var loginid;
router.get('/', function(req, res) {
	res.locals.admin = req.session.admin;
	// 如果用户登录了
	if (res.locals.login) {
		mysql.query('select * from result where username=?;', [res.locals.login], function(err, data2) {
			// 若该用户考试了
			if (data2.length > 0) {
				mysql.query('select * from user where username=?;', [res.locals.login], function(err, data4) {
					if (data4[0].score!=null) {
						res.render('index.ejs', {
							data: {
								ret: 1,
								score: data4[0].score
							}
						});
					} else {
						res.render('index.ejs', {
							data: {
								ret: 1,
								score: "请耐心等待您的考试结果！"
							}
						});
					}
				})
			} else {
				mysql.query('select * from question', function(err, data3) {
					data3.ret = 0;
					res.render('index.ejs', {
						data: data3
					});
				})
			}
		})
	} else {
		// 若没有登录可看到考试题目
		mysql.query('select * from question', function(err, data) {
			data.ret = 0;
			res.render('index.ejs', {
				data: data
			});
		})
	}
})

router.get('/logout', function(req, res) {
	res.clearCookie('login');
	res.redirect('/');
});

router.post('/user/:user', function(req, res) {
	var r_da = req.body,
		user = req.params.user;
	for (var i in r_da) {
		var ans = r_da[i];
		mysql.query('insert into result (username,questionid,answer) values (?,?,?);', [user, i, ans])
	}
	res.send({
		result: "1"
	})
})

router.use('/admin', require('./admin'));
router.use('/login', require('./login'));
module.exports = router;
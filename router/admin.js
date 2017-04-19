const express = require('express'),
	router = express.Router(),
	sql = require('mysql');

router.use('/',function(req,res,next){    
    if( req.session.admin ){
        next();
    }else{
        res.send('请用管理员账号登陆');
    }
});

router.get('/',function(req,res){
	mysql.query('select * from user',function(err,data){
		mysql.query('select result.username from result',function(err,data2){
			var unique = {};
			data2.forEach(function(a) {
				unique[JSON.stringify(a)] = 1
			});
			data2 = Object.keys(unique).map(function(u) {
				return JSON.parse(u)
			});
			data.result_name=data2;
			res.render('admin',{data:data});
		})
    });
})

router.post('/user/del/',function(req,res){
	var username=req.body.username;
	mysql.query('delete from user  where username=?',[username],function(err,data){
		mysql.query('delete from result  where username=?',[username],function(err,data){
			res.send({result:"删除成功"})
		})
	})
})

router.post('/subject/radio',function(req,res){
	var params = [
		req.body.title,
		req.body.a,
		req.body.b,
		req.body.c,
		req.body.d,
		req.body.answer,
		req.body.type
	];
	mysql.query(
		'insert into question (title,a,b,c,d,answer,type) values (?,?,?,?,?,?,?);',
		params, 
		function(err, data) {
	       if(err){
	         res.send({result:"something wrong,retry"});
	       } else {
	         res.send({result:"提交成功"})
	       }
		}
	)
})

router.get('/test/:name.html', function(req, res) {
	var re = {};
	var name = req.params.name;
	mysql.query('select * from result where username=?', [name], function(err, data1) {
		re['resu']=data1;
		mysql.query('select * from question', function(err, data2) {
			re['ques'] = data2;
			res.render('test', {
				data: re
			})
		})
	})
})

router.post('/user/score/',function(req,res){
	var params = [
		req.body.value,
		req.body.name
	];
	console.log(params);
	mysql.query('update user set score=? where username=?',params,function(err,data){
		res.send('1')
	})
})
module.exports=router;
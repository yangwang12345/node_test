const express = require('express'),
       router = express.Router(),
       sql = require('mysql');

router.get('/',function(req,res){
	res.render('login');
})

router.post('/',function(req,res){
    const  user = req.body.name,
           pass = req.body.pass;
    mysql.query('SELECT * FROM user where username = ?',[user],function(err,data){
        if(data.length == 0){
            res.send({
              result:"用户名不存在"
            });
            return
        }
        // if(data[0].admin ==0){}else{}
        if(data[0]['psw'] == pass){
            res.cookie('login',{ name:user },{ maxAge: 1000*60*60*24 } );
            req.session.admin = Number( data[0]['admin'] );
            res.send({
              result:"登陆成功"
            });
        }else{
            res.send({
              result:"密码错误"
            });
        }
    });
});

router.post('/register',function(req,res){
    const  user = req.body.name,
           pass = req.body.pass;
           email=req.body.email;
    mysql.query('SELECT * FROM user where username = ?',[user],function(err,data){
        if(data.length!=0){
            res.send({result:"用户已存在"});
        } else {
            mysql.query('SELECT * FROM user where email = ?',[email],function(err,data){
                if(data.length!=0){
                    res.send({result:"邮箱已存在"})
                } else {
                    mysql.query('insert into user (id,username,psw,email) values(0,?,?,?)',[user,pass,email],function(err,data){
                      if(err){
                        res.send({result:"something wrong,retry"});
                      } else {
                        // 此处有点问题
                        res.send({result:"注册成功"})
                      }
                    })
                }
            })
        }
    });
});
module.exports = router;
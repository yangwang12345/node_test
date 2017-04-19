var http=require('http'),
	express=require('express'),
	app=express(),
    bodyParser = require('body-parser'), 
    cookieParser = require('cookie-parser'),  
    session = require('express-session'),
    sql = require('mysql');
mysql =sql.createConnection({
    database:'my_library',
    host: "localhost",
    port:3306,
    user: "root",
    password: "123456"
}); 

mysql.connect();

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));


app.use(express.static('public'));

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended:true })); 

app.use(cookieParser('avfff'));
app.use(session({ secret:'node'})); 

app.use(function(req,res,next){    
    if( req.cookies['login'] ){
        res.locals.login =  req.cookies.login.name;
    }
    if( res.locals.login && req.session.admin == undefined){  
        mysql.query('SELECT * FROM user where username = ?',[res.locals.login],function(err,data){
            req.session.admin = Number(data[0]['admin']);
            next();
        });
    }else{
        next();
    }
});

app.use('/', require('./router/index'));
http.createServer(app).listen(2000);
var express = require("express");  
var http = require("http");  
var app = express();  
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
  
var router = express.Router();  
var testRouter =  require('./router/index');  
  
  
app.use('/test', testRouter);  
http.createServer(app).listen(3000);  
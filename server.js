const express = require('express')
var http                    = require('http');
const app = express()
const port = 4000
const cors = require("cors");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", '*');
    var allowedOrigins = ['http://localhost:4200','http://localhost:4000'];
    var origin         = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, x-parse-application-id,x-parse-rest-api-id,x-parse-rest-api-key, X-Requested-With,Authorization, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
   
    next(); 
  
  });

app.use((req, res, next)=>{
    if (req.headers['content-type'] && req.headers['content-type'].includes("application/json")&& req.originalUrl.toLowerCase().includes('/api/readcsv/searchAgentData'))
    req.headers['content-type'] = "application/json";    
        next();  
});
app.use(bodyParser.text({ type: 'application/json'}))

app.get('/',function(req,res){
    res.send("server is running!")
})

var authorization  = require('./controllers/auth.controller');// import controller here
 var users  = require('./controllers/user.controller');// import controller here
var transcation = require('./controllers/transcation.controller');


app.use('/api/auth', authorization);
 app.use('/api/user', users);
 app.use('/api/transcation', transcation);


var httpServer = http.createServer( app);
httpServer.setTimeout(300000);
httpServer.listen(port,function(){
    console.log('Server started on port',port);
});
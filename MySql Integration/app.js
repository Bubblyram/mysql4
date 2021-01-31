var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var connection=require('./model/database.js');
var connection=require('./model/database');

app.use(bodyParser.urlencoded({exteded:false}));
app.use(express.static(__dirname));

app.use('/signup',function(req,res){
    console.log('Signup Page');
    res.sendFile(__dirname+'/views/signup.html');
})

app.post('/check',function(req,res){
    var annual=req.body.annual;
    var c1=req.body.c1;
    var c2=req.body.c2;
    connection.query('insert into Misc_Information values(?,?,?)',[annual,c1,c2],(err,results)=>{
        if(err){
            res.sendFile(__dirname+'/views/signup.html');
            throw err;
        }
        if(results){
            console.log("Values Inserted");
            res.send(
                `
                <h1>
                Hello ${annual}
                Your details,<br>
                ${c1}<br>
                ${c2}<br>
                are successfully inserted to our database.
                </h1>    
                `
            )
        }
    })
})

app.listen(1000,()=>{
    console.log("Server is running at the port 1000");
})

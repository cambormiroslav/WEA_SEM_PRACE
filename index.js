const express = require("express");
const app = express();
const path = require('path');

app.use(express.static("public"));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) => {
    res.sendFile(__dirname+'/login.html');
});

app.post("/", (req, res ,next) => {
    const sqlite3 = require("sqlite3").verbose();

    const db = new sqlite3.Database('./databases/data.db', sqlite3.OPEN_READWRITE, (err) => {
        if(err) return console.log(err.message);
        console.log("connection successful");
    });

    const getdata = `SELECT password FROM Login WHERE username = ?`;

    var username = req.body.username;
    var password = req.body.password;

    
    db.all(getdata,[username],(err, row) => {
        if(err) return console.log(err.message);

        row.forEach(row => {
            if(row['password'] == password){
                return res.redirect('/todo');
            }else{
                return res.redirect('/');
            }
        });
        
    });

    db.close((err) => {
        if(err) return console.log(err.message);
    });

});

app.get("/todo", (req,res) => {
    res.sendFile(__dirname+'/todo.html');
});

app.post("/todo", (req, res ,next) => {
    console.log(req.body.action);
    console.log(req.body.value);
    var action = req.body.action;
    var value = req.body.value;

    if(action == "add"){
        console.log("added")
    }else if(action == "delete"){
        console.log("deleted")
    }else if(action == "done"){
        console.log("done")
    }
});

app.listen(process.env.PORT || 5555);
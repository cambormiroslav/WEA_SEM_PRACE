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
    const mysql = require("mysql");

    const con = mysql.createConnection({
        host: "eu-cdbr-west-02.cleardb.net",
        user: "b2ffa5a50a55d4",
        password: "6650e7dc",
        database: "heroku_98da7de83727676"
    });

    var action = req.body.action;
    var value = req.body.value;

    if(action == "add"){
        var sql = "INSERT INTO data (reminder, done) VALUES (?,?)";
        con.query(sql, [value, false],(err) => {
            if (err) console.log(err.message)
            else console.log("reminder inserted");
        });

        console.log("added");
    }else if(action == "delete"){
        var sql = "DELETE FROM data WHERE reminder = ?";
        con.query(sql, [value],(err) => {
            if (err) console.log(err.message);
            else console.log("reminder deleted");
        });

        console.log("deleted");
    }else if(action == "done"){
        var sql_update = "UPDATE data SET done = !done WHERE reminder = ?";
        con.query(sql_update, [value],(err) => {
            if (err) console.log(err.message)
            else console.log("updated");
        });

        console.log("done");
    }

    con.end(function(err){
        if(err) console.log(err.message);
    });
});

app.get("/json", (req,res) => {
    const mysql = require("mysql");

    const con = mysql.createConnection({
        host: "eu-cdbr-west-02.cleardb.net",
        user: "b2ffa5a50a55d4",
        password: "6650e7dc",
        database: "heroku_98da7de83727676"
    });

    var sql = "SELECT * FROM data";
    con.query(sql, (err, results) => {
        if (err) console.log(err.message)
        else {
            var results_json = {};
            let i = 0;
            results.forEach(result => results_json[i++] = {"reminder": result["reminder"],"done": result["done"]});
            console.log(results_json);
            res.send(JSON.stringify(results_json));
        }
    });

    con.end(function(err){
        if(err) console.log(err.message);
    });
});

app.listen(process.env.PORT || 5555);
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./databases/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err.message);
    console.log("connection successful");
});

db.run('CREATE TABLE Login(username, password)');
db.run('CREATE TABLE Data(reminder, done)');

db.close((err) => {
    if(err) return console.log(err.message);
});
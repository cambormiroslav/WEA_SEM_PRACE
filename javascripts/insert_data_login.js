const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./databases/data.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err.message);
    console.log("connection successful");
});

const sql = 'INSERT INTO Login (username, password) VALUES (?,?)';


db.run(sql,['test_user','hdjskdh256shdjak79sdwgbnbva'], (err) => {
    if(err) return console.log(err.message);
    console.log("A new row created");
});

/*
const getdata = 'SELECT * FROM Login';

db.all(getdata,[],(err, row) => {
    if(err) return console.log(err.message);

    row.forEach(row => {console.log(row)});
});
*/

db.close((err) => {
    if(err) return console.log(err.message);
});
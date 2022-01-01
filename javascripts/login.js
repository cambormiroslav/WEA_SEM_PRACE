function isItEqualPassword(){
    const sqlite3 = require("sqlite3").verbose();

    const db = new sqlite3.Database('../databases/data.db', sqlite3.OPEN_READWRITE, (err) => {
        if(err) return console.log(err.message);
        console.log("connection successful");
    });

    const getdata = `SELECT * FROM Login WHERE username = ?`;

    var username = document.getElementById("username");
    var password = document.getElementById("password");

    db.all(getdata,[username],(err, row) => {
        if(err) return console.log(err.message);

        row.forEach(row => {
            if(row == password){
                console.log("yes");
            }else{
                console.log("no");
            }
        });
        
    });

    db.close((err) => {
        if(err) return console.log(err.message);
    });
}
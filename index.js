const express = require("express");
const app = express();
const path = require('path');

app.use(express.static("public"));
app.use(express.static(__dirname));

app.get("/", (req,res) => {
    res.sendFile(__dirname+'/login.html');
});

app.listen(process.env.PORT || 5555);
const express = require("express");
const app = express();

app.get("/", (req,res) => {
    res.send("index.html");
});

app.listen(process.env.PORT || 5555);
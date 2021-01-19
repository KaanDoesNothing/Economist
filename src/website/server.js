const express = require("express");

const client = require("../main");

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
    return res.render("index");
});

app.listen(3000);
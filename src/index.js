const {Client} = require("klasa");
const config = require("./config");

const client = new Client({
    prefix: "!!",
    commandEditing: true
});

client.login(process.env.token || config.token);
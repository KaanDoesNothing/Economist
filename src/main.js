const Client = require("./lib/client");
const config = require("./config");

const client = new Client({
    prefix: "!!",
    commandEditing: true,
    typing: false,
    disableEveryone: true,
    owners: ["501710994293129216", "208948873433972737"]
});

client.login(process.env.token || config.token);

module.exports = client;

require("./website/server");
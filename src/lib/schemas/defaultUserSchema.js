const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultUserSchema
    .add("cst", "string", {default: ""})
    .add("level", folder => folder
        .add("xp", "integer", {default: 0, configurable: false})
        .add("current", "integer", {default: 1, configurable: false})
        .add("cooldown", "integer", {default: 0, configurable: false}))
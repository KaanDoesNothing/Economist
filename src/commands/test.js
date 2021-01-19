const { Command } = require("klasa");

module.exports = class extends Command {
    run(msg) {
        msg.reply("Hmmm");
    }
}
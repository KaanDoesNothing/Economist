const { Command } = require("../../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "[user:user]"
        });
    }
    run(msg, [user = msg.author]) {
        const level = msg.author.settings.get("level.current");
        return msg.sendMessage(`${user.tag}'s is lvl ${level}`);
    }
}
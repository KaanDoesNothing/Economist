const { Monitor } = require("../");

module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, {
            ignoreOthers: false,
            ignoreSelf: true
        });
    }

    async run(msg) {
        let level = msg.author.settings.get("level.current");
        let xp = msg.author.settings.get("level.xp");

        xp = xp + this.getRandomInt(14, 35);

        if((xp / 200) > level) {
            msg.author.settings.update("level.current", level + 1);
        }

        msg.author.settings.update("level.xp", xp);
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
}
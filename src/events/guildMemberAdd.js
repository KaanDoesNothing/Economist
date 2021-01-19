const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js");
const { mem } = require('node-os-utils');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd",
            enabled: true,
            event: "guildMemberAdd",
            emitter: client,
            once: false
        });
    }

    run(member) {
        if (member.guild.id != this.client.config.supportServer) return;
        if (member.user.bot) return;
        const channel = member.guild.channels.cache.get(this.client.config.channels.general);
        let rolePersist = await this.client.users.cache.get(member.id).settings.get("keys.persist");
        let nick = await client.users.cache.get(member.id).settings.get("keys.nick");
        if (nick) await member.setNickname(nick);
        let rp = rolePersist.split(";");
        member.roles.add(rp.filter((x) => rp.indexOf(x) % 2 == 0))
            .catch((x) => {});
            let chn = await this.client.users.cache.get(member.id).settings.get("keys.chnl");
            if (chn) {
                chn = chn.split(";f;");
                chn.forEach(async(x) => {
                    x = x.split(";");
                    await delay(100);//be kind to the api
                    member.guild.channels.cache.get(x[0]).overwritePermissions([
                        {
                            id: member.id,
                            deny: Number(x[1]),
                            allow: Number(x[2])
                        }
                    ])
                });
            };	
        let cst = await this.client.users.cache.get(member.id).settings.get("keys.cst");
            cst = cst ? cst.split(";") : [];
        if (cst.includes("wmc")) {
            channel.send(`♥️ Welcome back ${member}! Any roles you had when you left the server have been reassigned.`)
            return;
        };
        channel.send(`Welcome ${member} to ${member.guild.name}! :dollar: 500 have been added to your balance! I do hope you enjoy your stay ♥️`)
        let oldBal = await this.client.users.cache.get(member.id).settings.get("keys.bal");
        await this.client.users.cache.get(member.id).settigns.set("keys.bal", oldBal + 5000);
        cst.push("wmc");
        cst = cst.join(";")
        await this.client.users.cache.get(member.id).settigns.set("keys.cst", cst);
    }
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
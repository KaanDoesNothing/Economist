const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js");

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

            let owner = this.client.users.cache.get(this.client.config.owner).tag;
            let channel = this.client.channels.cache.get(this.client.config.channels.general)

            if (['462220963224879105', '157558716844081152', '336920581624692737', '540130125136658432', '163715276733415426', '684368759581835303'].includes(member.user.id)) {
                let muted = member.guild.roles.cache.get(client.config.roles.muted);
                await member.roles.add(muted.id);
                reason = 'owen repellent';
                await channel.send({
                        embed: new MessageEmbed()
                        .setColor("#36393e")
                        .setDescription(`${member.user.tag} has received a 10000000000000000000000 minute mute for "${reason}". If you believe this is a mistake (which it's not), please DM ${owner}. They were sent the following message:`)
                    });
                await channel.send({
                        embed: new MessageEmbed()
                        .setColor("#da0000")
                        .setDescription(`You have received a 10000000000000000000000 minute mute from ${member.guild.name} for "${reason}". If you believe this is a mistake, then feel free to DM ${owner}`)
                        .addField("Moderator", client.user.tag, true)
                        .addField("Reason", reason, true)
                    });
                await member.send({
                    embed: new MessageEmbed()
                    .setColor("#da0000")
                    .setDescription(`You have received a 10000000000000000000000 minute mute from ${member.guild.name} for "${reason}" If you believe this is a mistake, then feel free to DM ${owner}`)
                    .addField("Moderator", client.user.tag, true)
                    .addField("Reason", reason, true)
                }).catch((error) => {  });
            };
        //mute new members if they are newer than 2 weeks
            if (Number(member.user.createdTimestamp) > Date.now() - 1209600000) {
                let mute = member.guild.roles.cache.get(this.client.config.roles.muted)
                member.roles.add(mute.id);
                channel.send({
                    embed: new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`${member.user.tag} has received a 10000000000000000000000 minute mute for "[AUTOMOD] anti-raid (DM ${owner} to get unmuted)". If you believe this is a mistake, please DM ${owner}. They were sent the following message:`)
                });
                
                channel.send({
                    embed: new MessageEmbed()
                    .setColor("#da0000")
                    .setDescription(`You have received a 10000000000000000000000 minute mute from ${member.guild.name} because of "[AUTOMOD] anti-raid (DM ${owner} to get unmuted)". If you believe this is a mistake, then feel free to DM ${owner}`)
                    .addField("Moderator", client.user.tag, true)
                    .addField("Reason", `[AUTOMOD] anti-raid (dm ${owner} to get unmuted)`, true)
                });
                member.send({
                    embed: new MessageEmbed()
                    .setColor("#da0000")
                    .setDescription(`You have received a 10000000000000000000000 minute mute from ${member.guild.name} because of "[AUTOMOD] anti-raid (DM ${owner} to get unmuted)". If you believe this is a mistake, then feel free to DM ${owner}`)
                    .addField("Moderator", client.user.tag, true)
                    .addField("Reason", `[AUTOMOD] anti-raid (DM ${owner} to get unmuted)`, true)
                })
                .catch((e) => {});
            };
            this.client.channels.cache.get(this.client.config.channels.memberLog).send({
                embed: new MessageEmbed()
                .setTimestamp()
                .setColor('#00FF0C')
                .setAuthor(member.user.tag, member.user.avatarURL())
                .setFooter(`Member Joined • ID: ${member.user.id}`, member.user.avatarURL())
            })
    }
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }
};
const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberUpdate",
            enabled: true,
            event: "guildMemberUpdate",
            emitter: client,
            once: false
        });
    }

    run(oldMember, newMember) {
      if (oldMember.guild.id != this.client.config.supportServer) return; //ignore other servers
      if (!newMember.nickname) {
        await this.client.users.cache.get(newMember.id).settings.delete("nick")
      };
      if (oldMember.nickname != newMember.nickname) {
        await this.client.users.cache.get(newMember.id).settings.set("nick", nickname)
      };
      const oldRoles = oldMember.roles.cache.map(x => `${x.id}${x.name}`).join(";")
      const newRoles = newMember.roles.cache.map(x => `${x.id}${x.name}`).join(";")
      if (oldRoles != newRoles) {
        await this.client.users.cache.get(newMember.id).settings.set(`persist`, newRoles);
      };    
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
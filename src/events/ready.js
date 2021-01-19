const { Event } = require('klasa');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {

    constructor(client) {
        super(client, {
            name: 'ready',
            enabled: true,
            event: 'ready',
            emitter: client,
            once: false
        });
    }

    run(client) {
      this.client.user.setPresence({
        activity: {
          name: `${client.guilds.cache['size']} servers | ~support to join our support server for free 💵 500`,
          type: 'WATCHING',
        },
        status: 'dnd'
      })	

      console.log(`Logged in as ${client.user.tag}`);
      this.client.guilds.cache.get(client.config.supportServer).members.fetch();
      this.client.channels.cache.get(client.config.channels.ready).send({
        embed: new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Successfully logged in; ${client.guilds.cache.size} guilds cached with ${client.users.cache.size} users.`)
      });
      client.keys = ["stn", "dns"].concat(["nick", "chnl", "clr", "dlc", "fsh", "v", "sgstc", "crdt", "fdc", "hgs", "ofncs", "clrs", "dfnd", "assigns", "curralias", "petbu", "cst", 'mute', 'noexec', 'antistun', 'stun', 'stunmsg', 'color', 'noComma', `cmds`, 'pet', 'bal', 'fish_rod', 'phone', 'number', 'phonebook', 'chillpills', 'dailyc', 'sentc', 'dialc', 'dose0', 'strokec', 'role', 'spouse', 'fishc', 'fish0', 'fish1', 'fish2', 'fish3', 'fish4', 'infcs', 'petname', 'searchc', 'deldatareqed', 'debug', 'bio', 'replacers', 'dprvc', 'robc', 'srchc', 'feedc', 'dwngrdc', 'welcome', "persist", "wmc", 'blacklist', 'xp', 'xpc', 'xplvl', "perms"].sort());    
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
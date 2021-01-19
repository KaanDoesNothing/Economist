const { Monitor } = require("klasa");

module.exports = class extends Monitor {
    shouldRun(message) {
		return this.enabled &&
			this.allowedTypes.includes(message.type) &&
			!(this.ignoreBots && message.author.bot) &&
			!(this.ignoreSelf && this.client.user === message.author) &&
			!(this.ignoreOthers && this.client.user !== message.author) &&
			!(this.ignoreWebhooks && message.webhookID) &&
			!(this.ignoreBlacklistedUsers && this.client.settings.get('userBlacklist').includes(message.author.id)) &&
			!(this.ignoreBlacklistedGuilds && message.guild && this.client.settings.get('guildBlacklist').includes(message.guild.id));
	}
}
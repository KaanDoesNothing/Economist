const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'error',
            enabled: true,
            event: 'error',
            emitter: client,
            once: false
        });
    }

    run(err) {
      console.log(err.stack);
    }
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
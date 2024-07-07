const { Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const { token } = require('./config.json');
const fs = require("node:fs");
const path = require('node:path');

const client = new Client({intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, 'events');
eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// event handler
for(const file of eventFiles){
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
const { Client, GatewayIntentBits } = require('discord.js');
const {connectToDatabase} = require('./src/db/connection');
require('dotenv').config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.on('ready', () => {
    console.log("Bot online!");
    connectToDatabase(process.env.URI);
});


bot.login(process.env.TOKEN);
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const {connectToDatabase} = require('./src/db/connection');
const fs = require('node:fs');
const path = require('node:path');
const { findMessages } = require('./src/cron/sendMessages');

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: ["MESSAGE", "CHANNEL"]});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log("Bot online!");
    connectToDatabase(process.env.URI);
	findMessages(client);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);
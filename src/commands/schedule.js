const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Schedule messages!')
        .addChannelOption((option) =>
            option
            .setName('channel')
            .setDescription('channel the massage should be sent to')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('date')
            .setDescription('FORMAT: YYYY/MM/DD HH:MM')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('period')
            .setDescription('AM or PM')
            .setChoices(
                {name: 'AM', value: 'AM'},
                {name: 'PM', value: 'PM'}
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('timezone')
            .setDescription('timezone the message should use')
            .setChoices(
                {name: 'São Paulo', value: 'America/Sao_Paulo'},
                {name: 'New York', value: 'America/New_York'}
            )
            .setRequired(true)
        ),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
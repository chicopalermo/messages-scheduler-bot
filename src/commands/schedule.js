const { SlashCommandBuilder } = require('discord.js');
const { ChannelType, MessageCollector } = require('discord.js');
const momentTimezone = require('moment-timezone');
const Message = require('../db/models/Message');

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
            .setName('message')
            .setDescription('message that should be scheduled')
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
		const targetChannel = interaction.options.getChannel('channel');
        const messageContent = interaction.options.getString('message');
        const [ date, time ] = interaction.options.getString('date').split(' ');
        const period = interaction.options.getString('period');
        const timezone = interaction.options.getString('timezone');

        let checkDate = new Date(`${date} ${time}`);

        if(!(checkDate instanceof Date) || isNaN(checkDate)) {
            interaction.reply('Invalid Date Format');
            return;
        }
        
        const targetDate = momentTimezone.tz(
            `${date} ${time} ${period}`,
            'YYYY-MM-DD HH:mm A',
            timezone
        );
        
        interaction.reply('Message scheduled!');

        const message = {
            channelId: targetChannel.id,
            guildId: interaction.guild.id,
            content: messageContent,
            date: targetDate.valueOf()
        };

        await Message.create(message);
	},
};
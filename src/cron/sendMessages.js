const cron = require('node-cron');
const Message = require('../db/models/Message');

const findMessages = (client) => {  
    cron.schedule('* * * * *', async () => {
        const query = {
            date: {
                $lte: Date.now(),
            },
        };
    
        const results = await Message.find(query);
    
        for (const post of results) {
            const { guildId, channelId, content } = post;
    
            const guild = await client.guilds.fetch(guildId);
            if (!guild) continue;
        
            const channel = guild.channels.cache.get(channelId);
            
            if (!channel) continue;
    
            channel.send(content);
        }
    
        await Message.deleteMany(query);
    });
};

module.exports = { findMessages };
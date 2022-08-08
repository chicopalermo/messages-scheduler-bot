const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
  channelId: String,
  guildId: String,
  content: String,
  date: Date
});

module.exports = Message;
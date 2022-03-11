const mongoose = require('mongoose')
const schema = mongoose.Schema({
   GuildId: {
     type: String,
     required: true,
   },

   ChannelId: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model("Logchannel", schema)
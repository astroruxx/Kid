const mongoose = require('mongoose')
const schema = mongoose.Schema({
    GuildId: {
      type: String,
      required: true,
    },
 
    MuteRole: {
       type: String,
       required: true
    }
 })
module.exports = mongoose.model('Mute', schema)
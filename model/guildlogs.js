const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
        Guild: { type: String, require: true },
        GuildName: { type: String },
        LogChannel: { type: String },
        Prefix: { type: String},
});

const model = mongoose.model("GuildSchema", guildSchema);

module.exports = model;
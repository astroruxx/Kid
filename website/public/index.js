const fs = require('fs')
const Client = require("../../index").Client

module.exports = {
    name: "/",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/home.ejs")];

        let args = {
            users: Client.users.cache.size,
            guilds: Client.guilds.cache.size
        }

    
        res.render("./website/html/home.ejs", args)
    }
}
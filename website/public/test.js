const fs = require('fs')
const Client = require("../../index").Client

module.exports = {
    name: "/test",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/test.ejs")];

        let args = {
            users: Client.users.cache.size,
            guilds: Client.guilds.cache.size
        }

    
        res.render("./website/html/test.ejs", args)
    }
}
const fs = require('fs')
const client = require("../../index").client

module.exports = {
    name: "/test",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/test.ejs")];

        let args = {
            users: client.users.cache.size,
            guilds: client.guilds.cache.size
        }

    
        res.render("./website/html/test.ejs", args)
    }
}
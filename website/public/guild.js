const { Permissions } = require('discord.js');
const Client = require("../../index").Client
const schema = require('../../model/dashboard')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require("../../config.json");

module.exports = {
    name: "/getUserGuilds/:id",
    run: async (req, res) => {
        // delete cache
        delete require.cache[require.resolve("../html/getUserGuilds.ejs")];

        // check if the bot is in the guild + check if the URL has the ID
        if (!req.params.id || !Client.guilds.cache.has(req.params.id)) return res.redirect('/getUserGuilds')

        // login check
        if (!req.cookies.token) return res.redirect('/login')
        let decoded;
        try {
            decoded = jwt.verify(req.cookies.token, jwt_secret);
        } catch (e) {}
        if (!decoded) res.redirect("/login");

        // getting data
        let data = await schema.findOne({
            _id: decoded.uuid,
            userID: decoded.userID
        });

        //if no data redirect to login
        if (!data) res.redirect("/login");

        // defining some stuff
        const guild = Client.guilds.cache.get(req.params.id);
        if (!guild) return res.redirect('/getUserGuilds');
        const member = await guild.members.fetch(data.userID);
        if (!member) return res.redirect('/getUserGuilds');


        const bitPermissions = new Permissions(member.permissions.bitfield);
        if (!member.permissions.has('MANAGE_GUILD') && !member.permissions.has('ADMINISTRATOR') && Client.guilds.cache.get(guild.id).ownerId == data.userID) return res.redirect('/getUserGuilds')
        res.send(`
        You're viewing ${guild.name}.<br>
        <a href="/getUserGuilds">Back</a> <br><br>
        <a href="/">Back to Home</a> <br><br>
        Your Permissions in this guild are: <br><br><br><br>
        ${Object.entries(bitPermissions.serialize()).map(a => a[0] + ' - ' + a[1]).join('<br>')}
        `)
        
        let args = {
            avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.user.userID,
        };

        //  res.render("./website/html/getUserGuilds.ejs", args);

    }
}
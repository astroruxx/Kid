const modmailClient = require("../client/modmail");
const client = require("../index");

client.on("messageCreate", async (message) => {
   modmailClient.modmailListener(message);
});

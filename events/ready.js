const {setPresence} = require('discord.js');
const client = require("../index");
const arrayOfStatus = [
    'Agents, WATCHING',
    'Shield, WATCHING',
    'Spotify, LISTENING',
    'Netflix, WATCHING',
    'Data.Args(), STREAMING'
]

client.on('ready', () =>
    console.log(`[CLIENT] The client has been logged in`),
    setInterval(() => {
        const random = arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)].split(', ')
        const status = random[0]
        const mode = random[1]
        client.user.setActivity(status, {type: mode})
        client.user.setStatus('dnd')
        client.user.setUsername('Shield')
    }, 5000),
    
    
)
   
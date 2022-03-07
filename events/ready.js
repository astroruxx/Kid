const {setPresence} = require('discord.js');
const { commands } = require('../index');
const client = require("../index");
const arrayOfStatus = [
    'Agents, WATCHING',
    'Shield, WATCHING',
    'Spotify, LISTENING',
    'Netflix, WATCHING',
    'uncaught errors, WATCHING',
]

client.on('ready', () =>
    console.log(`[Client] Shield logged in successfully`),
    console.log('[Client] Starting args(2)'),
        setInterval(() => {
        const random = arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)].split(', ')
        const status = random[0]
        const mode = random[1]
        client.user.setActivity(status, {type: mode})
        client.user.setStatus('dnd')
        client.user.setUsername('Shield')
        
    }, 10000),
    
    
)
   
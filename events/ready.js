const {setPresence} = require('discord.js');
const { commands } = require('../index');
const client = require("../index");
const arrayOfStatus = [
    'Agents, WATCHING',
    'Shield, WATCHING',
    'Spotify, LISTENING',
    ', WATCHING',
    'astroruxx.github.io, WATCHING',
]

client.on('ready', () =>
    console.log(`[Client] Astro is proccesing the request`),
    console.log('[Client] Starting the database'),
        setInterval(() => {
        const random = arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)].split(', ')
        const status = random[0]
        const mode = random[1]
        client.user.setActivity(status, {type: mode})
        client.user.setStatus('dnd')
        client.user.setUsername('Astrorux')
        
    }, 10000),
    
    
)
   
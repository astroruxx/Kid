const {setPresence} = require('discord.js');
const client = require("../index");
const arrayOfStatus = [
    'https://astroruxx.github.io/, WATCHING',
    'The Avengers, WATCHING',
    'Spotify, LISTENING',
    'Netflix, WATCHING',
    'With The Dead, PLAYING'
]

client.on('ready', () =>
    console.log(`Ready for missions`),
    setInterval(() => {
        const random = arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)].split(', ')
        const status = random[0]
        const mode = random[1]
        client.user.setActivity(status, {type: mode})
        client.user.setStatus('dnd')
    }, 5000),
    
    
);

   
const {setPresence} = require('discord.js');
const { boost } = require('ultrax');
const client = require("../index");
const arrayOfStatus = [
    'https://astrorux.github.io/',
    'The Avengers',
    'Dms',
    'Captain America',
    'For Missions'
]

client.on('ready', () =>
    console.log(`${client.user.tag} is ready for more missions`),
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: arrayOfStatus [Math.floor(Math.random() * arrayOfStatus.length) ], type: 'WATCHING' }]})
        client.user.setStatus('dnd')
    }, 5000),
    
    
);

   
const {setPresence} = require('discord.js');
const { boost } = require('ultrax');
const client = require("../index");
const arrayOfStatus = [
    'https://astroruxx.github.io/',
    'The Avengers',
    'Dms',
    'Netflix',
    'The Dead'
]

client.on('ready', () =>
    console.log(`${client.user.tag} is up and ready to go!`),
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: arrayOfStatus [Math.floor(Math.random() * arrayOfStatus.length) ], type: 'WATCHING' }]})
        client.user.setStatus('dnd')
    }, 5000),
    
    
);

   
{
    name: 'badwords',
    description; "Add or remove badwords that the bot is going to delete",
    options; [{
        name: 'action',
        description: "choose add or remove",
        type: "STRING",
        choices: [
            {
                name: "add",
                value: "add"
            },

            {
                name: "remove",
                value: "remove"
            }
        ],
        required: true
    },
    {
        name: "word",
        description: "the word that you want to execute the action on",
        type: "STRING",
        required: true
    }
]
}
async function createCmd(Client, guildId) {
    const data = [

        // echo cmd
        {
            name: 'echo',
            description: 'Echo your text!',
            options: [{
                name: 'text',
                type: 'STRING',
                description: 'The input to echo back',
                required: true,
            }],
        },

        // ping
        {
            name: 'ping',
            description: "Reply with pong"
        },


        // context menu example
        {
            name: "hello",
            type: 3
        },


        // purge command
        {
            name: "purge",
            description: "Purge up to 300 messages",
            options: [{
                name: "amount",
                type: "NUMBER",
                description: "The amount that is going to be deleted",
                required: true
            }]
        },

    ]


    await Client.guilds.cache.get('938485402656981022')?.commands.set(data);
}
//728751693503922190



module.exports = { createCmd }